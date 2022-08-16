import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { BASE_BACKEND_URL } from "config"
import { BackendRoutes } from "api/auth/backend.routes"
import { setAccessToken } from "api/auth"

const accessToken = localStorage.getItem("access")

function AuthorizationHeader(config: AxiosRequestConfig) {
	if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`

	return config
}

const axiosApiInstance: AxiosInstance = axios.create({
	baseURL: BASE_BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
})
axiosApiInstance.interceptors.request.use(AuthorizationHeader)

async function refreshAccessToken() {
	const refreshToken = localStorage.getItem("refresh")
	if (!refreshToken) {
		localStorage.clear()
		axios.defaults.headers.common["Authorization"] = ""
		throw new Error("No refresh token")
	}

	const response = await axiosApiInstance.post(BackendRoutes.REFRESH, {
		refresh: refreshToken,
	})
	setAccessToken(response.data.access)
	return response.data.access
}

axiosApiInstance.interceptors.response.use(
	(response) => {
		console.log("Success")
		return response
	},
	async function(error) {
		const originalRequest = error.config

		if (error.response.status === 401) {
			console.log("Unauthorized")
			if (!originalRequest._retry && error.response.data.code === "token_not_valid") {
				originalRequest._retry = true
				const access_token = await refreshAccessToken()
				console.log(access_token)
				axiosApiInstance.defaults.headers.common["Authorization"] = "Bearer " + access_token
				return axiosApiInstance(originalRequest)
			}
		}
		console.log("Clear LocalStorage")
		localStorage.clear()
		axiosApiInstance.defaults.headers.common["Authorization"] = ""
		return Promise.reject(error)
	},
)

export default axiosApiInstance

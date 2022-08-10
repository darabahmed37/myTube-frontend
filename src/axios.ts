import axios, {AxiosInstance, AxiosRequestConfig} from "axios"

const accessToken = localStorage.getItem("access")

function AuthorizationHeader(config: AxiosRequestConfig) {
	if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`

	return config
}

const axiosApiInstance: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_BACKEND_URL, headers: {
		"Content-Type": "application/json",
	},
})

async function refreshAccessToken() {
	const refreshToken = localStorage.getItem("refresh")
	if (!refreshToken) return
	const response = await axiosApiInstance.post("/auth/refresh/", {refresh: refreshToken})
	localStorage.removeItem("access")
	localStorage.setItem("access", response.data.access)
}

axiosApiInstance.interceptors.response.use((response) => {
	return response
}, async function (error) {
	const originalRequest = error.config
	if (error.response.status === 401 && !originalRequest._retry && error.response.data.code === "token_not_valid") {
		originalRequest._retry = true
		const access_token = await refreshAccessToken()
		axios.defaults.headers.common["Authorization"] = "Bearer " + access_token
		return axiosApiInstance(originalRequest)

	}

	localStorage.clear()
	return Promise.reject(error)
})

axios.interceptors.request.use(AuthorizationHeader)

export default axiosApiInstance

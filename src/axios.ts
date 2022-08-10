import axios, { AxiosError, AxiosRequestConfig } from "axios"

const accessToken = localStorage.getItem("access")

function AuthorizationHeader(config: AxiosRequestConfig) {
	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
}

async function RefreshInterceptor(error: AxiosError) {
	if (
		error?.response!.data === "token_not_valid" &&
		error.response!.status === 401
	) {
		await refreshAccessToken()
	}
}

async function refreshAccessToken() {
	const refreshToken = localStorage.getItem("refresh")
	if (!refreshToken) return
	const response = await axios.post("/auth/refresh", { refresh: refreshToken })
	localStorage.setItem("access", response.data.access)
}

axios.interceptors.request.use(AuthorizationHeader)
axios.interceptors.response.use((res) => res, RefreshInterceptor)

export default axios.create({
	baseURL: "http://localhost:8000",
	headers: {
		"Content-Type": "application/json",
	},
})

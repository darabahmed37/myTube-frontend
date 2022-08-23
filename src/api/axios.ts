import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"
import { BASE_BACKEND_URL } from "config"
import { refreshAccessToken } from "api/auth"
import { getAccessToken } from "utils"

function AuthorizationHeader(config: AxiosRequestConfig) {
	return {
		...config,
		headers: {
			...config.headers,
			Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : " ",
		},
	}
}

const axiosApiInstance: AxiosInstance = axios.create({
	baseURL: BASE_BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
})
axiosApiInstance.interceptors.request.use(AuthorizationHeader)

axiosApiInstance.interceptors.response.use(
	(response) => {
		return response
	},
	async function(error) {
		const originalRequest = error.config

		if (error.response.status === 401) {
			if (!originalRequest._retry && error.response.data.code === "token_not_valid") {
				originalRequest._retry = true
				const access_token = await refreshAccessToken()
				axiosApiInstance.defaults.headers.common["Authorization"] = "Bearer " + access_token
				return axiosApiInstance(originalRequest)
			}
			delete axiosApiInstance.defaults.headers.common["Authorization"]
			console.log("Clear LocalStorage")
			localStorage.clear()
			return Promise.reject(error)
		}
	},
)

export default axiosApiInstance
export const publicRoutes: AxiosInstance = axios.create({
	baseURL: BASE_BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
})

// Requests format
export const failedResponse = (error: AxiosError) => {
	return Promise.reject(error);
};

export const getRequest = (route: string, data= {},instance=axiosApiInstance) => {
	const backendRoute = `${BASE_BACKEND_URL}${route}`;
	return instance
	.get(backendRoute, data)
	.then((response) => {
		return response;
	})
	.catch((error) => {
		return failedResponse(error);
	});
};
export const postRequest = (route: string, data= {},instance=axiosApiInstance) => {
	const backendRoute = `${BASE_BACKEND_URL}${route}`;
	return instance
	.post(backendRoute, data)
	.then((response) => {
		return response;
	})
	.catch((error) => {
		return failedResponse(error);
	});
};
export const deleteRequest = (route: string, data= {},instance=axiosApiInstance) => {
	const backendRoute = `${BASE_BACKEND_URL}${route}`;
	return instance
	.post(backendRoute, data)
	.then((response) => {
		return response;
	})
	.catch((error) => {
		return failedResponse(error);
	});
};
export const putRequest = (route: string, data= {},instance=axiosApiInstance) => {
	const backendRoute = `${BASE_BACKEND_URL}${route}`;
	return instance
	.post(backendRoute, data)
	.then((response) => {
		return response;
	})
	.catch((error) => {
		return failedResponse(error);
	});
};

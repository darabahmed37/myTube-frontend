import axios, { publicRoutes } from "api/axios"
import { AxiosResponse } from "axios"
import { AuthRoutes } from "api/auth/routes"
import { getUser } from "api/profile"

export function setAccessToken(accessToken: string) {
	localStorage.removeItem("access")
	getUser()
	localStorage.setItem("access", accessToken)
}

export function getAccessToken() {
	return localStorage.getItem("access")
}

export function setRefreshToken(refreshToken: string) {
	localStorage.removeItem("refresh")
	localStorage.setItem("refresh", refreshToken)
}

export function logOut() {
	localStorage.clear()
	delete axios.defaults.headers.common["Authorization"]
	window.location.href = "/"
}

export async function signInWithEmailAndPassword(email: string, password: string): Promise<AxiosResponse> {
	let response: AxiosResponse

	response = await publicRoutes.post(AuthRoutes.SIGN_IN, {
		email,
		password,
	})
	setAccessToken(response.data.access)
	setRefreshToken(response.data.refresh)

	return response
}

export async function signUpWithEmailAndPassword(email: string, password: string): Promise<AxiosResponse> {
	let response: AxiosResponse

	response = await publicRoutes.post(AuthRoutes.SIGN_UP, {
		email,
		password,
	})

	return response
}

export async function getGoogleAuthUrl(): Promise<void> {
	let response: AxiosResponse

	response = await publicRoutes.get(AuthRoutes.LOGIN_WITH_GOOGLE)

	window.location.href = response.data.authorization_url
}

export async function getAccessTokenFromGoogle(code: string): Promise<AxiosResponse> {
	let response: AxiosResponse
	try {
		response = await publicRoutes.post(AuthRoutes.OAUTH2CALLBACK, {
			code,
		})
		setAccessToken(response.data.access)
		setRefreshToken(response.data.refresh)
	} catch (e) {
		// @ts-ignore
		response = e.response as AxiosResponse

		if (response.status === 307) {
			const { redirectUrl } = response.data
			window.location.href = (await publicRoutes.get(redirectUrl)).data.authorization_url
		}
	}
	return response
}

export async function refreshAccessToken() {
	const refreshToken = localStorage.getItem("refresh")
	if (!refreshToken) {
		localStorage.clear()
		delete axios.defaults.headers.common["Authorization"]
		throw new Error("No refresh token")
	}

	const response = await publicRoutes.post(AuthRoutes.REFRESH, {
		refresh: refreshToken,
	})
	setAccessToken(response.data.access)
	return response.data.access
}

import axios from "api/axios"
import { AxiosResponse } from "axios"
import {BackendRoutes} from "api/auth/backend.routes"

export function setAccessToken(accessToken: string) {
	localStorage.setItem("access", accessToken)
}

export function setRefreshToken(refreshToken: string) {
	localStorage.setItem("refresh", refreshToken)
}

export function getAccessToken() {
	return localStorage.getItem("access")
}

export function getRefreshToken() {
	return localStorage.getItem("refresh")
}

export async function signInWithEmailAndPassword(email: string, password: string): Promise<AxiosResponse> {
	let response: AxiosResponse

		response = await axios.post(BackendRoutes.SIGN_IN, {
			email,
			password,
		})
		setAccessToken(response.data.access)
		setRefreshToken(response.data.refresh)

	return response
}

export async function signUpWithEmailAndPassword(email: string, password: string): Promise<AxiosResponse> {
	let response: AxiosResponse

	response = await axios.post(BackendRoutes.SIGN_UP, {
		email,
		password,
	})


	return response
}

export async function getGoogleAuthUrl(): Promise<void> {
	let response: AxiosResponse

		response = await axios.get(BackendRoutes.LOGIN_WITH_GOOGLE)

		window.location.href = response.data.authorization_url

}

export async function getAccessTokenFromGoogle(code: string): Promise<AxiosResponse> {
	let response: AxiosResponse
	try {
		response = await axios.post(BackendRoutes.OAUTH2CALLBACK, {
			code,
		})
		setAccessToken(response.data.access)
		setRefreshToken(response.data.refresh)
	} catch (e) {
		// @ts-ignore
		response = e.response as AxiosResponse

		if (response.status === 307) {
			const { redirectUrl } = response.data
			window.location.href = (await axios.get(redirectUrl)).data.authorization_url
		}
	}
	return response
}

import { getRequest, postRequest, publicRoutes as axios } from "api/axios"
import { AxiosResponse } from "axios"
import { AuthRoutes } from "api/auth/routes"

export function signInWithEmailAndPassword(email: string, password: string): Promise<AxiosResponse> {
	return postRequest(AuthRoutes.SIGN_IN, { email, password }, axios)
}

export function signUpWithEmailAndPassword(email: string, password: string): Promise<AxiosResponse> {
	return postRequest(AuthRoutes.SIGN_UP, { email, password }, axios)
}

export function getGoogleAuthUrl(): Promise<AxiosResponse> {
	return getRequest(AuthRoutes.LOGIN_WITH_GOOGLE, axios)
}

export function getAccessTokenFromGoogle(code: string): Promise<AxiosResponse> {
	return postRequest(AuthRoutes.OAUTH2CALLBACK, { code }, axios)
}

export function handleRedirectGoogle(redirectUrl: string): Promise<AxiosResponse> {
	return getRequest(redirectUrl, axios)
}

export function refreshAccessToken(refresh: string): Promise<AxiosResponse> {
	return postRequest(AuthRoutes.REFRESH, { refresh }, axios)
}

export function changePassword(password: string): Promise<AxiosResponse> {
	return postRequest(AuthRoutes.CHANGE_PASSWORD, { password })
}

import { logOut, setAccessToken, setRefreshToken } from "utils"
import {
	changePassword,
	getAccessTokenFromGoogle,
	getGoogleAuthUrl,
	handleRedirectGoogle,
	refreshAccessToken,
	signInWithEmailAndPassword,
	signUpWithEmailAndPassword,
} from "api/auth"
import { AxiosResponse } from "axios"

export async function signInWithEmailAndPasswordAction(email: string, password: string): Promise<void> {
	const response = await signInWithEmailAndPassword(email, password)
	await setAccessToken(response.data.access)
	setRefreshToken(response.data.refresh)
}

export async function signUpWithEmailAndPasswordAction(email: string, password: string): Promise<AxiosResponse> {
	return signUpWithEmailAndPassword(email, password)
}

export async function getGoogleAuthUrlAction(): Promise<void> {
	try {
		const response = await getGoogleAuthUrl()
		window.location.href = response.data.authorization_url
	} catch (error) {
		console.error(error)
	}
}

export async function getAccessTokenFromGoogleAction(code: string) {
	try {
		let response = await getAccessTokenFromGoogle(code)
		await setAccessToken(response.data.access)
		setRefreshToken(response.data.refresh)
	} catch (e) {
		// @ts-ignore
		let response = e.response as AxiosResponse

		if (response.status === 307) {
			const { redirectUrl } = response.data
			handleRedirectGoogle(redirectUrl).then((response) => {
				window.location.href = response.data.authorization_url
			})
		}
	}
}

export async function refreshAccessTokenAction() {
	const refreshToken = localStorage.getItem("refresh")
	if (refreshToken) {
		try {
			const response = await refreshAccessToken(refreshToken)
			await setAccessToken(response.data.access)
			return response.data.access as string
		} catch (e) {
			console.error(e)
			logOut()
		}
	} else {
		logOut()
	}
}


export async function changePasswordAction(password: string): Promise<string> {
	return (await changePassword(password)).data.message
}
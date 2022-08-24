import axios from "api/axios"
import { initUserService } from "utils/service"

export async function setUser(): Promise<void> {


	initUserService().then(response => {
		localStorage.removeItem("user")
		localStorage.setItem("user", JSON.stringify(response.data))
	})

}

export async function setAccessToken(accessToken: string) {
	localStorage.removeItem("access")

	localStorage.setItem("access", accessToken)
	await setUser()
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

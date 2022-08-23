import { setUser } from "api/profile"
import axios from "api/axios"

export function setAccessToken(accessToken: string) {
	localStorage.removeItem("access")
	setUser().then(() => {
	})
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
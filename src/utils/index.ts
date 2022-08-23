import { User } from "types/IAuth"

export function isValidEmail(email: string): boolean {
	return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export function getUser(): User | null {
	const user = localStorage.getItem("user")
	return user ? JSON.parse(user).user : null
}
export { logOut } from "utils/user"
export { setRefreshToken } from "utils/user"
export { getAccessToken } from "utils/user"
export { setAccessToken } from "utils/user"
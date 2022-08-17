import { User } from "types/IAuth"

export function isValidEmail(email: string): boolean {
	return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export function getUser(): User {
	return JSON.parse(localStorage.getItem("user") || "{}").user as User
}

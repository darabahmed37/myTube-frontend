import { User } from "types/IAuth"
import {v4 as uuidv4} from "uuid"
export function isValidEmail(email: string): boolean {
	return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export function getUser(): User {
	return JSON.parse(localStorage.getItem("user") || "{}").user as User
}


export function uuid(){

	return uuidv4()
}
import { initUser } from "api/profile"

export async function initUserService() {
	return await initUser()
}
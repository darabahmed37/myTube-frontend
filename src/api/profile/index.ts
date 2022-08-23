import { getRequest } from "api/axios"
import { ProfileRoutes } from "api/profile/routes"

export async function initUser() {
	return getRequest(ProfileRoutes.get_user)
}
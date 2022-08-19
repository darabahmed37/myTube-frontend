import { ProfileRoutes } from "api/profile/routes"
import { AxiosResponse } from "axios"
import axios from "api/axios"

export async function setUser(): Promise<AxiosResponse> {
	let response: AxiosResponse
	response = await axios.get(ProfileRoutes.get_user)
	localStorage.removeItem("user")
	localStorage.setItem("user", JSON.stringify(response.data))
	return response
}

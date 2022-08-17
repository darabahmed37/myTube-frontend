import { AxiosResponse } from "axios"
import axios from "api/axios"
import {YoutubeRoutes} from "api/youtube/routes"

export async function GetAllPlayLists(): Promise<AxiosResponse> {
	let response: AxiosResponse

	response = await axios.get(YoutubeRoutes.ALL_PLAYLISTS)
	return response
}
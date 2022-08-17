import { AxiosResponse } from "axios"
import axios from "api/axios"
import { generatePlayListByIdUrl, YoutubeRoutes } from "api/youtube/routes"
import { YouTubePlayListItems } from "types/YouTube"

export async function GetAllPlayLists(): Promise<AxiosResponse> {
	let response: AxiosResponse

	response = await axios.get(YoutubeRoutes.ALL_PLAYLISTS)
	return response
}

export async function GetPlayListById(id: string): Promise<YouTubePlayListItems> {
	let response: AxiosResponse

	response = await axios.get(generatePlayListByIdUrl(id))
	return response.data as YouTubePlayListItems
}

import { AxiosResponse } from "axios"
import axios from "api/axios"
import { generatePlayListByIdUrl, generateVideoByIdUrl, YoutubeRoutes } from "api/youtube/routes"
import { IYouTubePlayListItems, IYouTubeVideo } from "types/YouTube"

export async function GetAllPlayLists(): Promise<AxiosResponse> {
	let response: AxiosResponse

	response = await axios.get(YoutubeRoutes.ALL_PLAYLISTS)
	return response
}

export async function GetPlayListById(id: string): Promise<IYouTubePlayListItems> {
	let response: AxiosResponse

	response = await axios.get(generatePlayListByIdUrl(id))
	return response.data as IYouTubePlayListItems
}

export async function getVideoById(id: string): Promise<IYouTubeVideo> {
	let response: AxiosResponse

	response = await axios.get(generateVideoByIdUrl(id))
	return response.data as IYouTubeVideo
}

import { AxiosResponse } from "axios"
import axios from "api/axios"
import { generatePlayListByIdUrl, generateVideoByIdUrl, YoutubeRoutes } from "api/youtube/routes"
import { IYouTubePlayListItems, IYouTubeVideo } from "types/YouTube"
import { memoize } from "lodash"

 async function MGetAllPlayLists(): Promise<AxiosResponse> {
	let response: AxiosResponse

	response = await axios.get(YoutubeRoutes.ALL_PLAYLISTS)
	return response
}

 async function MGetPlayListById(id: string): Promise<IYouTubePlayListItems> {
	let response: AxiosResponse

	response = await axios.get(generatePlayListByIdUrl(id))
	return response.data as IYouTubePlayListItems
}

 async function MGetVideoById(id: string): Promise<IYouTubeVideo> {
	let response: AxiosResponse

	response = await axios.get(generateVideoByIdUrl(id))
	return response.data as IYouTubeVideo
}

export const getVideoById=memoize(MGetVideoById)
export const getPlayListById=memoize(MGetPlayListById)
export const GetAllPlayLists=memoize(MGetAllPlayLists)
import { AxiosResponse } from "axios"
import axios from "api/axios"
import { generatePlayListByIdUrl, generateVideoByIdUrl, YoutubeRoutes } from "api/youtube/routes"
import { IYouTubePlayListItems, IYouTubeVideo } from "types/YouTube"
import { memoize } from "lodash"

async function _GetAllPlayLists(): Promise<IYouTubePlayListItems> {
	let response: AxiosResponse

	response = await axios.get(YoutubeRoutes.ALL_PLAYLISTS)
	return response.data as IYouTubePlayListItems
}

async function _GetPlayListById(id: string): Promise<IYouTubePlayListItems> {
	let response: AxiosResponse

	response = await axios.get(generatePlayListByIdUrl(id))
	return response.data as IYouTubePlayListItems
}

async function _GetVideoById(id: string): Promise<IYouTubeVideo> {
	let response: AxiosResponse

	response = await axios.get(generateVideoByIdUrl(id))
	return response.data as IYouTubeVideo
}


export async function setUserPlaylist(id: string):Promise<void> {
	await axios.post(YoutubeRoutes.SET_PLAYLIST, { id })
}

export const getVideoById = memoize(_GetVideoById)
export const getPlayListById = memoize(_GetPlayListById)
export const getAllPlayLists = memoize(_GetAllPlayLists)

import { AxiosResponse } from "axios"
import { getRequest, postRequest } from "api/axios"
import { generatePlayListByIdUrl, generateVideoByIdUrl, YoutubeRoutes } from "api/youtube/routes"

export function getAllPlayLists(): Promise<AxiosResponse> {

	return getRequest(YoutubeRoutes.ALL_PLAYLISTS)

}

export async function getPlayListById(id: string): Promise<AxiosResponse> {
	return getRequest(generatePlayListByIdUrl(id))
}

export async function getVideoById(id: string): Promise<AxiosResponse> {
	return getRequest(generateVideoByIdUrl(id))
}

export function setUserPlaylist(id: string): Promise<AxiosResponse> {


	return postRequest(YoutubeRoutes.SET_PLAYLIST, { id })
}

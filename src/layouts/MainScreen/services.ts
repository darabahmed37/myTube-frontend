import { IYouTubePlayListItems } from "types/YouTube"

import { VideoCardProps } from "types/ComponentProps"
import { getPlayListById } from "api/youtube"

export async function getPlaylistByIdAction(id: string) {
	const youTubePlayLists: IYouTubePlayListItems = (await getPlayListById(id)).data

	const temp: VideoCardProps[] = youTubePlayLists.items.map((item) => ({
		title: item.snippet.title,
		thumbnails: item.snippet.thumbnails,
		id: item.id,
		description: item.snippet.description,
		videoId: item.snippet.resourceId.videoId,
	}))
	return temp
}

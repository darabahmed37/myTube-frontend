import { IYouTubePlayListItems } from "types/YouTube";

import { VideoCardProps } from "types/ComponentProps";
import { getPlayListById } from "api/youtube";

export async function getPlaylistByIdAction(id: string) {
	const youTubePlayLists: IYouTubePlayListItems = (await getPlayListById(id)).data;

	const temp: VideoCardProps[] = [];
	youTubePlayLists.items.forEach((item: any) => {
		if (Object.keys(item.snippet.thumbnails).length !== 0) {
			temp.push({
				title: item.snippet.title,
				thumbnails: item.snippet.thumbnails,
				id: item.id,
				description: item.snippet.description,
				videoId: item.snippet.resourceId.videoId,
			});
		}
	});
	return temp;
}

/*
title: item.snippet.title,
		thumbnails: item.snippet.thumbnails,
		id: item.id,
		description: item.snippet.description,
		videoId: item.snippet.resourceId.videoId,
 */

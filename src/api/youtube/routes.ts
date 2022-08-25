export enum YoutubeRoutes {
	ALL_PLAYLISTS = "/yt/all-playlist/",
	PLAYLIST_BY_ID = "/yt/list/",
	GET_VIDEO_BY_ID = "/yt/video/",
	SET_PLAYLIST = "/yt/set-playlist/",
}

export function generatePlayListByIdUrl(id: string): string {
	return YoutubeRoutes.PLAYLIST_BY_ID + id + "/"
}

export function generateVideoByIdUrl(id: string): string {
	return YoutubeRoutes.GET_VIDEO_BY_ID + id + "/"
}

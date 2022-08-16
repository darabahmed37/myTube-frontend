export enum BackendRoutes {
	SIGN_IN = "/auth/sign-in/",
	SIGN_UP = "/auth/sign-up/",
	LOGIN_WITH_GOOGLE = "/auth/login-with-google/",
	OAUTH2CALLBACK = "/auth/oauth2callback/",
	REFRESH = "/auth/refresh/",
	ALL_PLAYLISTS = "/yt/all-playlist/",
	PLAYLIST_BY_ID = "/yt/list/:playlist_id/",
	GET_VIDEO_BY_ID = "/yt/video/:video_id/",
}

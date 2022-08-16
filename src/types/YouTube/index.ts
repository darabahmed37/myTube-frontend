interface IYTImage {
	url: string
	width: number
	height: number
}

interface IThumbnails {
	default: IYTImage
	medium: IYTImage
	high: IYTImage
	standard: IYTImage
	maxres: IYTImage
}

export interface YouTubePlayLists {
	id: string
	snippet: {
		title: string
		thumbnails: IThumbnails
	}
}

export interface YouTubePlayListItems {
	items: {
		id: string
		snippet: {
			title: string
			description: string
			thumbnails: IThumbnails
		}
		resourceId: {
			videoId: string
		}
	}[]
}

export interface YouTubeVideo {
	items: [
		{
			id: string
			snippet: {
				title: string
				description: string
				thumbnails: IThumbnails
				tags: string[]
				categoryId: string
			}
			player: string
		}
	]
}

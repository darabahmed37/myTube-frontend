import { IThumbnails } from "types/YouTube"

export interface VideoCardProps {
	title: string
	description: string
	thumbnails: IThumbnails
	id: string
	videoId: string
}

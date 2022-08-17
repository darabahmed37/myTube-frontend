import { User } from "types/IAuth"
import { v4 as uuidv4 } from "uuid"
import { YouTubePlayListItems } from "types/YouTube"
import { GetPlayListById } from "api/youtube"
import { VideoCardProps } from "types/ComponentProps"

export function isValidEmail(email: string): boolean {
	return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export function getUser(): User {
	return JSON.parse(localStorage.getItem("user") || "{}").user as User
}

export function uuid() {
	return uuidv4()
}

export async function getPlayLists(id: string) {
	const youTubePlayLists: YouTubePlayListItems = await GetPlayListById(id)
	const temp: VideoCardProps[] = youTubePlayLists.items.map((item) => ({
		title: item.snippet.title,
		thumbnails: item.snippet.thumbnails,
		id: item.id,
		description: item.snippet.description,
	}))
	return temp
}

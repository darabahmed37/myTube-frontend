import { User } from "types/IAuth"
import { IYouTubePlayListItems } from "types/YouTube"
import { getPlayListById } from "api/youtube"
import { VideoCardProps } from "types/ComponentProps"

export function isValidEmail(email: string): boolean {
	return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export function getUser(): User | null {
	const user = localStorage.getItem("user")
	return user ? JSON.parse(user).user : null
}

export async function getPlayLists(id: string) {
	const youTubePlayLists: IYouTubePlayListItems = await getPlayListById(id)
	const temp: VideoCardProps[] = youTubePlayLists.items.map((item) => ({
		title: item.snippet.title,
		thumbnails: item.snippet.thumbnails,
		id: item.id,
		description: item.snippet.description,
		videoId: item.snippet.resourceId.videoId,
	}))
	return temp
}



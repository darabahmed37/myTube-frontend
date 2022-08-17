import React, { FC, useEffect } from "react"
import { GetPlayListById } from "api/youtube"
import { YouTubePlayListItems } from "types/YouTube"
import { VideoCardProps } from "types/ComponentProps"
import VideoGrid from "components/VideoGrid"

const Dashboard: FC = () => {
	const [playlists, setPlaylists] = React.useState<VideoCardProps[]>([])

	async function getPlayLists() {
		const temp: VideoCardProps[] = []

		const youTubePlayLists: YouTubePlayListItems = await GetPlayListById("PLwajP6X62-C5jtqbacQD4YElNnMOj1tFK")
		youTubePlayLists.items.map((item) => {
			temp.push({
				title: item.snippet.title,
				thumbnails: item.snippet.thumbnails,
				id: item.id,
				description: item.snippet.description,
			})
		})
		setPlaylists(temp)
	}

	useEffect(() => {
		getPlayLists()
	}, [])
	return (
		<>
			<VideoGrid videos={playlists} />
		</>
	)
}

export default Dashboard

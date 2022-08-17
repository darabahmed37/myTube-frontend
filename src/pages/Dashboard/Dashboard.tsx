import React, { FC, useEffect } from "react"
import { GetAllPlayLists } from "api/youtube"
import { YouTubePlayLists } from "types/YouTube"
import { VideoCardProps } from "types/ComponentProps"
import VideoGrid from "components/VideoGrid"

const Dashboard: FC = () => {
	const [playlists, setPlaylists] = React.useState<VideoCardProps[]>([])

	async function getPlayLists() {
		const temp: VideoCardProps[] = []

		const youTubePlayLists: YouTubePlayLists = (await GetAllPlayLists()).data
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
	},[])
	return (
		<>
			<VideoGrid videos={playlists} />
		</>
	)
}

export default Dashboard

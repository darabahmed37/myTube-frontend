import React, { FC, useEffect } from "react"
import { GetAllPlayLists } from "api/auth"
import { YouTubePlayListItems } from "types/YouTube"
import { VideoGridProps } from "types/ComponentProps"

const Dashboard: FC = () => {
	const [playlists, setPlaylists] = React.useState<VideoGridProps>()

	async function getPlayLists() {
		const playLists: YouTubePlayListItems = (await GetAllPlayLists()).data
	}

	useEffect(() => {
		getPlayLists()
	})
	return <></>
}

export default Dashboard

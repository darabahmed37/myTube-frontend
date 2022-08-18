import React, { FC, useCallback, useEffect } from "react"
import { Container } from "layouts/Player/emotion"
import Box from "@mui/material/Box"
import VideoGrid from "components/VideoGrid"
import { getPlayLists, getUser } from "utils"
import { VideoCardProps } from "types/ComponentProps"
import { getVideoById } from "api/youtube"
import { IYouTubeVideo } from "types/YouTube"
import { Typography } from "@mui/material"
import YouTube from "components/YouTube"

interface VideoValues {
	embedHTML: string
	title: string
	description: string
}

const Player: FC<{ videoId: string }> = ({ videoId }) => {
	const user = getUser()
	const [playlists, setPlaylists] = React.useState<VideoCardProps[]>([])
	const [video, setVideo] = React.useState<VideoValues>({
		embedHTML: "",
		title: "",
		description: "",
	})

	const initialize = useCallback(async () => {
		const playlistTemp = await getPlayLists(user.playlist)
		const videoTemp: IYouTubeVideo = await getVideoById(videoId as string)
		setVideo({
			embedHTML: videoTemp.items[0].player.embedHtml,
			title: videoTemp.items[0].snippet.title,
			description: videoTemp.items[0].snippet.description,
		})
		setPlaylists(playlistTemp)
	}, [videoId, user.playlist])
	useEffect(() => {
		initialize()
	}, [initialize, videoId])

	return (
		<Container>
			<Box>
				{video.embedHTML ? (
					<YouTube embedHtml={video?.embedHTML} title={video?.title} />
				) : (
					<Typography variant={"h3"}>Loading...</Typography>
				)}
				<Typography variant={"h5"} fontWeight={"600"}>
					{video?.title}
				</Typography>
				<Typography variant={"body1"}>{video.description}</Typography>
			</Box>

			<Box>
				<VideoGrid videos={playlists} />
			</Box>
		</Container>
	)
}

export default Player

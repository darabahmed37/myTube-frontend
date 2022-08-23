import React, { FC } from "react"
import Player from "components/Player"
import { useParams } from "react-router-dom"
import VideoGrid from "components/VideoGrid"
import { Container } from "./emotion"

const PlayerScreen: FC = () => {
	const { videoId } = useParams()

	return (
		<Container>
			<Player videoId={videoId as string} />

			<VideoGrid />
		</Container>
	)
}

export default PlayerScreen

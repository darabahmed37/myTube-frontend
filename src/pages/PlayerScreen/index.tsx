import React, { FC } from "react"
import Player from "layouts/Player"
import { useParams } from "react-router-dom"

const PlayerScreen: FC = () => {
	const { videoId } = useParams()

	return (
		<>
			<Player videoId={videoId as string} />
		</>
	)
}

export default PlayerScreen

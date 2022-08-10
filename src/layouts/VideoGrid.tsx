import React, {FC} from "react"
import {Grid} from "@mui/material"
import VideoCard, {VideoCardProps} from "../components/VideoCard"

interface VideoGridProps {
	videos: VideoCardProps[]
}

const VideoGrid: FC<VideoGridProps> = ({videos}) => {
	return (
		<Grid container gap={"2.5em"}>
			{videos.map((video, index) => (
				<Grid item xl ={2}key={index}>
					<VideoCard  {...video} />
				</Grid>
			))}
		</Grid>
	)
}

export default VideoGrid

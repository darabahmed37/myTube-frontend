import React, { FC } from "react"
import { Grid } from "@mui/material"
import VideoCard, { VideoCardProps } from "../components/VideoCard"

interface VideoGridProps {
	videos: VideoCardProps[]
}

const VideoGrid: FC<VideoGridProps> = ({ videos }) => {
	return (
		<Grid container>
			{videos.map((video, index) => (
				<Grid md={4} item key={index}>
					<VideoCard {...video} />
				</Grid>
			))}
		</Grid>
	)
}

export default VideoGrid

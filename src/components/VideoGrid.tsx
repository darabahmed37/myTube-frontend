import React, { FC } from "react"
import { Grid } from "@mui/material"
import VideoCard from "components/VideoCard"
import { VideoCardProps } from "types/ComponentProps"


interface VideoGridProps {
	videos:VideoCardProps[]
}

const VideoGrid: FC<VideoGridProps> = ({ videos }) => {
	return (
		<Grid container gap={"2.5em"}>
			{videos.map((vid, index) => (
				<Grid item xl={2} key={index}>
					<VideoCard {...vid} />
				</Grid>
			))}
		</Grid>
	)
}

export default VideoGrid

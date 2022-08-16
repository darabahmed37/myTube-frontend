import React, { FC } from "react"
import { Grid } from "@mui/material"
import VideoCard from "components/VideoCard"
import { VideoCardProps, VideoGridProps } from "types/ComponentProps"


const VideoGrid: FC<VideoCardProps[]> = (videos ) => {
	return (
		<Grid container gap={"2.5em"}>
			{videos.map((video, index) => (
				<Grid item xl={2} key={index}>
					<VideoCard {...video} />
				</Grid>
			))}
		</Grid>
	)
}

export default VideoGrid

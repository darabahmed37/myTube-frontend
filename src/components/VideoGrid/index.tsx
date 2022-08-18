import React, { FC, useContext } from "react"
import { Grid, Typography } from "@mui/material"
import VideoCard from "components/VideoCard"
import { VideoCardProps } from "types/ComponentProps"
import { CardGrid } from "components/VideoGrid/style"
import { playListContext } from "App"

const VideoGrid: FC = () => {
	const playlist = useContext<VideoCardProps[]>(playListContext)
	return (
		<Grid container gap={"2.5em"}>
			{playlist.length ? (
				playlist.map((vid, index) => (
					<Grid item key={index} sx={CardGrid}>
						<VideoCard {...vid} />
					</Grid>
				))
			) : (
				<Typography variant={"h3"}>Loading...</Typography>
			)}
		</Grid>
	)
}

export default React.memo(VideoGrid)

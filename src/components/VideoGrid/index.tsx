import React, { FC, useContext } from "react"
import { Grid, LinearProgress } from "@mui/material"
import VideoCard from "components/VideoCard"
import { VideoCardProps } from "types/ComponentProps"
import { CardGrid } from "components/VideoGrid/style"
import { PlaylistContext } from "App"

const VideoGrid: FC = () => {
	const playlist = useContext<VideoCardProps[]>(PlaylistContext)
	return (
		<Grid container gap={"2.5em"}>
			{playlist.length ? (
				playlist.map((vid, index) => (
					<Grid item key={index} sx={CardGrid}>
						<VideoCard {...vid} />
					</Grid>
				))
			) : (
				<LinearProgress />
			)}
		</Grid>
	)
}

export default React.memo(VideoGrid)

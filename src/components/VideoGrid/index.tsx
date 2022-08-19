import React, { FC, useEffect } from "react"
import { Grid, LinearProgress } from "@mui/material"
import VideoCard from "components/VideoCard"
import { CardGrid } from "components/VideoGrid/style"
import { VideoCardProps } from "types/ComponentProps"
import { getPlayLists, getUser } from "utils"


const VideoGrid: FC = () => {
	const [playlist, setPlaylist] = React.useState<VideoCardProps[]>([])
	const user = getUser()

	useEffect(() => {
		if (user?.playlist)
			getPlayLists(user?.playlist).then(data => {
				setPlaylist(data)

			})
	}, [user?.playlist])
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

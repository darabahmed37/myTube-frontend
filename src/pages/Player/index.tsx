import React, { FC, useEffect } from "react"
import YouTube from "components/YouTube"
import data from "iFrame.json"
import { Typography } from "@mui/material"
import { Container } from "pages/Player/emotion"
import Box from "@mui/material/Box"
import VideoGrid from "components/VideoGrid"
import { getPlayLists, getUser } from "utils"
import { VideoCardProps } from "types/ComponentProps"

const Player: FC = () => {
	const user = getUser()
	const [playlists, setPlaylists] = React.useState<VideoCardProps[]>([])

	useEffect(() => {
		getPlayLists(user.playlist).then((data) => {
			setPlaylists(data)
		})
	}, [])
	return (
		<Container>
			<Box>
				<YouTube embedHtml={data.embedHtml} title={"Name"} />
				<Typography variant={"h5"} fontWeight={"600"}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto, asperiores autem consectetur
					cumque dignissimos dolorem dolo.
				</Typography>
				<Typography variant={"body1"}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut culpa ea eos fuga fugit incidunt iure iusto
					modi omnis optio quam quod, reiciendis, repudiandae sed sint, suscipit ut voluptas.
				</Typography>
			</Box>

			<Box>
				<VideoGrid videos={playlists} />
			</Box>
		</Container>
	)
}

export default Player

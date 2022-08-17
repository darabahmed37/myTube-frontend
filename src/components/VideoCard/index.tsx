import React, { FC } from "react"
import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { CardMediaSx, CardStyles } from "components/VideoCard/style"
import { VideoCardProps } from "types/ComponentProps"
import {theme} from "theme"

const VideoCard: FC<VideoCardProps> = ({ title, description, thumbnails }) => {
	const [elevation, setElevation] = React.useState(0)

	return (
		<Card sx={CardStyles}   elevation={elevation} onMouseEnter={()=>{
			setElevation(5)
		}} onMouseLeave={()=>{
			setElevation(0)
		}}>
			<CardMedia component={"img"} image={thumbnails.high.url} alt={"Video Logo"} sx={CardMediaSx} />

			<CardContent sx={CardMediaSx}>
				<Typography variant={"h6"} fontWeight={800} mb={2}>
					{title.length > 35 ? title.substring(0, 35) + "..." : title}
				</Typography>
				<Typography variant={"subtitle2"}>
					{description.length > 100 ? description.substring(0, 100) + "..." : description}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default VideoCard

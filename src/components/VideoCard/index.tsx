import React, { FC } from "react"
import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { CardChildMaxWidth, CardStyles } from "components/VideoCard/style"

export interface VideoCardProps {
	title: string
	description: string
	imageUrl: string
}

const VideoCard: FC<VideoCardProps> = ({ title, description, imageUrl }) => {
	return (
		<Card sx={CardStyles}>
			<CardMedia component={"img"} image={imageUrl} alt={"Video Logo"} sx={CardChildMaxWidth} />

			<CardContent sx={CardChildMaxWidth}>
				<Typography variant={"h6"} fontWeight={800} mb={2}>
					{title}
				</Typography>
				<Typography variant={"subtitle2"}>
					{description.length > 100 ? description.substring(0, 100) + "..." : description}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default VideoCard

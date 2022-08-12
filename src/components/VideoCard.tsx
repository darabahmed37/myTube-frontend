import React, { FC } from "react"
import { Card, CardContent, CardMedia, Typography } from "@mui/material"

export interface VideoCardProps {
	title: string
	description: string
	imageUrl: string
}

const VideoCard: FC<VideoCardProps> = ({ title, description, imageUrl }) => {
	return (
		<Card
			sx={{
				display: "flex",
				padding: ".7rem",
				maxWidth: "30rem",
			}}
		>
			<CardMedia
				component={"img"}
				image={imageUrl}
				alt={"Video Logo"}
				sx={{
					maxWidth: "50%",
				}}
			/>

			<CardContent
				sx={{
					maxWidth: "50%",
				}}
			>
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

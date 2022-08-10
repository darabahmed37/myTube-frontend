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
				width: "33rem",
				maxHeight: "13rem",
				padding: ".7rem",
			}}
		>
			<CardMedia
				component={"img"}
				image={imageUrl}
				alt={"Video Logo"}
				sx={{
					width: "18rem",
				}}
			/>

			<CardContent>
				<Typography variant={"h6"} fontWeight={800} mb={2}>
					{title}
				</Typography>
				<Typography variant={"subtitle2"}>
					{description.length > 100
						? description.substring(0, 100) + "..."
						: description}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default VideoCard

import React, { FC } from "react";
import { Card, CardContent, CardMedia, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CardMediaSx, CardStyles } from "components/VideoCard/style";
import { VideoCardProps } from "types/ComponentProps";
import { useNavigate } from "react-router-dom";

const VideoCard: FC<VideoCardProps> = ({ title, description, thumbnails, videoId }) => {
	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up("md"));
	const [elevation, setElevation] = React.useState(0);
	const navigate = useNavigate();

	return (
		<Card
			sx={CardStyles}
			elevation={elevation}
			onMouseEnter={() => {
				setElevation(5);
			}}
			onMouseLeave={() => {
				setElevation(0);
			}}
			onClick={() => {
				navigate(`/${videoId}`);
				window.scroll({
					top: 0,
					left: 0,
					behavior: "smooth",
				});
			}}
		>
			<CardMedia component={"img"} image={thumbnails.high.url} alt={"Video Logo"} sx={CardMediaSx} />

			<CardContent sx={CardMediaSx}>
				<Typography variant={"h6"} fontWeight={800} mb={2}>
					{title.length > 35 ? title.substring(0, 35) + "..." : title}
				</Typography>
				{md ? (
					<Typography variant={"subtitle2"}>
						{description.length > 100 ? description.substring(0, 100) + "..." : description}
					</Typography>
				) : (
					""
				)}
			</CardContent>
		</Card>
	);
};

export default VideoCard;

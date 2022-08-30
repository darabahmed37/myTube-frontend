import React, { FC } from "react";
import { Grid, Skeleton } from "@mui/material";
import VideoCard from "components/VideoCard";
import { CardGrid } from "components/VideoGrid/style";
import { VideoCardProps } from "types/ComponentProps";

interface VideoGridProps {
	playlist: VideoCardProps[];
}

const VideoGrid: FC<VideoGridProps> = ({ playlist }) => {
	return (
		<Grid container gap={"2.5em"}>
			{playlist.length !== 0
				? playlist.map((vid, index) => (
						<Grid item key={index} sx={CardGrid}>
							<VideoCard {...vid} />
						</Grid>
				  ))
				: Array.from(new Array(10)).map((_, index) => (
						<Grid item key={index}>
							<Skeleton variant="rectangular" width={"29em"} height={"15em"} />
						</Grid>
				  ))}
		</Grid>
	);
};

export default VideoGrid;

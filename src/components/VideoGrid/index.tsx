import React, { FC } from "react";
import { Grid, LinearProgress } from "@mui/material";
import VideoCard from "components/VideoCard";
import { CardGrid } from "components/VideoGrid/style";
import { VideoCardProps } from "types/ComponentProps";

interface VideoGridProps {
	playlist: VideoCardProps[];
}

const VideoGrid: FC<VideoGridProps> = ({ playlist }) => {
	return (
		<Grid container gap={"2.5em"}>
			{playlist.length !== 0 ? (
				playlist.map((vid, index) => (
					<Grid item key={index} sx={CardGrid}>
						<VideoCard {...vid} />
					</Grid>
				))
			) : (
				<LinearProgress />
			)}
		</Grid>
	);
};

export default VideoGrid;

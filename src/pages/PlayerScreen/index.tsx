import React, { FC, useContext } from "react";
import Player from "components/Player";
import { useParams } from "react-router-dom";
import VideoGrid from "components/VideoGrid";
import { DashboardContext } from "context/DashboardContext";
import { Container } from "pages/PlayerScreen/emotion";

const PlayerScreen: FC = () => {
	const { videoId } = useParams();
	const playlist = useContext(DashboardContext);

	return (

		<Container>
			<Player videoId={videoId as string} />

			<VideoGrid playlist={playlist} />
		</Container>


	);
};

export default PlayerScreen;

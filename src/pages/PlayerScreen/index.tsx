import React, { FC, useContext } from "react";
import Player from "components/Player";
import { useParams } from "react-router-dom";
import VideoGrid from "components/VideoGrid";
import { DashboardContext } from "context/DashboardContext";
import { Container, Clock, CountDownBox } from "pages/PlayerScreen/emotion";
import { Divider, Stack } from "@mui/material";
import { H3 } from "elements/Typography";

const PlayerScreen: FC = () => {
	const { videoId } = useParams();
	const playlist = useContext(DashboardContext);

	return (
		<Stack direction="row" spacing={2} justifyContent={"space-between"}>
			<Container>
				<Player videoId={videoId as string} />

				<VideoGrid playlist={playlist} />
			</Container>
			<CountDownBox>
				<H3>Time Remaining</H3>
				<Divider />
				<Clock date={Date.now() + 9000000000} />
			</CountDownBox>
		</Stack>
	);
};

export default PlayerScreen;

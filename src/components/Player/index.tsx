import React, { FC, useCallback, useEffect } from "react";
import { getVideoById } from "api/youtube";
import { IYouTubeVideo } from "types/YouTube";
import { Divider, LinearProgress, Typography } from "@mui/material";
import YouTube from "elements/YouTube";
import { Clock, CountDownBox, PlayerArea, PlayerContainer, TextArea, TimerTypography } from "components/Player/emotion";
import { H3 } from "elements/Typography";
import { CountdownRenderProps } from "react-countdown";

interface VideoValues {
	embedHTML: string;
	title: string;
	description: string;
}

function render({ hours, minutes, seconds }: CountdownRenderProps) {
	return (
		<TimerTypography variant="h4">
			{hours}:{minutes}:{seconds}
		</TimerTypography>
	);
}

const Player: FC<{ videoId: string }> = ({ videoId }) => {
	const [video, setVideo] = React.useState<VideoValues>({
		embedHTML: "",
		title: "",
		description: "",
	});

	const initialize = useCallback(async () => {
		const videoTemp: IYouTubeVideo = (await getVideoById(videoId as string)).data;
		setVideo({
			embedHTML: videoTemp.items[0].player.embedHtml,
			title: videoTemp.items[0].snippet.title,
			description: videoTemp.items[0].snippet.description,
		});
	}, [videoId]);

	useEffect(() => {
		initialize().then(() => {
		});
	}, [initialize]);

	return (
		<>
			{video.embedHTML ? (
				<PlayerContainer>
					<PlayerArea>
						<YouTube embedHtml={video?.embedHTML} title={video?.title} />

						<Typography variant={"h5"} fontWeight={"600"}>
							{video?.title}
						</Typography>
						<TextArea contentEditable={false} value={video?.description} readOnly />
					</PlayerArea>
					<CountDownBox>
						<H3>Time Remaining</H3>
						<Divider />
						<Clock date={Date.now() + 9000000000} renderer={render} />
					</CountDownBox>
				</PlayerContainer>
			) : (
				<LinearProgress />
			)}
		</>
	);
};

export default React.memo(Player);

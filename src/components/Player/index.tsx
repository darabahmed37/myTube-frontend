import React, { FC, useCallback, useEffect, useState } from "react";
import { getVideoById } from "api/youtube";
import { IYouTubeVideo } from "types/YouTube";
import { Divider, LinearProgress, Typography } from "@mui/material";
import YouTube from "elements/YouTube";
import {
	Clock,
	ClockDiv,
	CountDownBox,
	PlayerArea,
	PlayerContainer,
	TextArea,
	TimerTypography,
} from "components/Player/emotion";
import { H3 } from "elements/Typography";
import { CountdownRenderProps } from "react-countdown";
import { IRunningTime, ITimer } from "types/Timer";
import {
	convertHoursToMilliseconds,
	convertIntoHours,
	getTimerAction,
	setTimeAction,
} from "components/Player/services";

interface VideoValues {
	embedHTML: string;
	title: string;
	description: string;
}

const Player: FC<{ videoId: string }> = ({ videoId }) => {
	const [video, setVideo] = React.useState<VideoValues>({
		embedHTML: "",
		title: "",
		description: "",
	});
	const [time, setTime] = useState<ITimer | undefined>(undefined);
	let clock: IRunningTime;
	const initialize = useCallback(async () => {
		const videoTemp: IYouTubeVideo = (await getVideoById(videoId as string)).data;
		setVideo({
			embedHTML: videoTemp.items[0].player.embedHtml,
			title: videoTemp.items[0].snippet.title,
			description: videoTemp.items[0].snippet.description,
		});
	}, [videoId]);

	function render({ hours, minutes, seconds }: CountdownRenderProps) {
		clock = { hours, minutes, seconds };
		return (
			<TimerTypography variant="h4">
				{hours}:{minutes}:{seconds}
			</TimerTypography>
		);
	}

	useEffect(() => {
		initialize().then(() => {
			getTimerAction().then((data) => {
				setTime(data);
			});
		});
	}, [initialize]);
	useEffect(() => {
		return () => {
			if (clock !== undefined) {
				console.log("clock", clock);
				const hours = convertIntoHours(clock);
				setTimeAction(hours).then(() => {});
			}
		};
	});

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
						<ClockDiv>
							{time ? <Clock date={Date.now() + convertHoursToMilliseconds(time.total_time)} renderer={render} /> : ""}
						</ClockDiv>
					</CountDownBox>
				</PlayerContainer>
			) : (
				<LinearProgress />
			)}
		</>
	);
};

export default React.memo(Player);

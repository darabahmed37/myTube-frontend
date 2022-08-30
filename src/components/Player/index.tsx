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
	TimeUpMessage,
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
import { DoNotDisturb } from "@mui/icons-material";

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
	const initialize = useCallback(async () => {
		const videoTemp: IYouTubeVideo = (await getVideoById(videoId as string)).data;
		setVideo({
			embedHTML: videoTemp.items[0].player.embedHtml,
			title: videoTemp.items[0].snippet.title,
			description: videoTemp.items[0].snippet.description,
		});
	}, [videoId]);
	let clock: IRunningTime | undefined;

	function render({ hours, minutes, seconds }: CountdownRenderProps) {
		clock = { hours, minutes, seconds };
		return (
			<TimerTypography variant="h4">
				{hours}:{minutes}:{seconds}
			</TimerTypography>
		);
	}

	function updateTime() {
		if (clock !== undefined) {
			const hours = convertIntoHours(clock);
			setTimeAction(hours).then(() => {});
		}
	}

	const interval = setInterval(updateTime, 120000);

	useEffect(() => {
		initialize().then(() => {
			getTimerAction().then((data) => {
				setTime(data);
			});
		});
	}, [initialize]);
	useEffect(() => {
		return () => {
			updateTime();
			clearInterval(interval);
		};
	});

	return (
		<>
			{video.embedHTML ? (
				<PlayerContainer>
					{time?.total_time ? (
						<PlayerArea>
							<YouTube embedHtml={video?.embedHTML} title={video?.title} />

							<Typography variant={"h5"} fontWeight={"600"}>
								{video?.title}
							</Typography>
							<TextArea
								contentEditable={false}
								value={
									video?.description.length > 500 ? video.description.substring(0, 500) + "..." : video.description
								}
								rows={10}
								readOnly
							/>
						</PlayerArea>
					) : (
						<TimeUpMessage>
							<DoNotDisturb />
							Dear User you have used time quota for today. Please give yourself some time to relax and then come back to watch
							more videos. <p>{!time?.availed_time ? "You can get 2 more hours... visit settings" : ""}</p>
						</TimeUpMessage>
					)}
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

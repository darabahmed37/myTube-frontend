import React, { FC, useEffect, useState } from "react";
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
	VideoInfo,
} from "components/Player/emotion";
import { H3 } from "elements/Typography";
import { CountdownRenderProps } from "react-countdown";
import { IRunningTime, ITimer } from "types/Timer";
import {
	convertHoursToMilliseconds,
	convertIntoHours,
	getTimerAction,
	getVideoByIdAction,
	setTimeAction,
} from "components/Player/services";
import { SentimentVeryDissatisfiedOutlined } from "@mui/icons-material";

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

	let clock: IRunningTime | undefined;

	function render({ hours, minutes, seconds }: CountdownRenderProps) {
		clock = { hours, minutes, seconds };
		if (convertIntoHours(clock) === 0) {
			updateTime();
		}
		return (
			<TimerTypography variant="h4">
				{hours}:{minutes}:{seconds}
			</TimerTypography>
		);
	}

	function updateTime() {
		if (clock !== undefined) {
			const hours = convertIntoHours(clock);
			setTimeAction(hours).then(() => {

			});
		}
	}

	const interval = setInterval(updateTime, 120000);

	useEffect(() => {
		Promise.all([getVideoByIdAction(videoId), getTimerAction()]).then(([video, time]) => {
			setVideo(video);
			setTime(time);
		});
	}, [videoId]);
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
							<VideoInfo>
								<Typography variant={"h5"} fontWeight={"600"}>
									{video?.title}
								</Typography>
								{video.description.length > 200 ? (
									<TextArea
										contentEditable={false}
										value={
											video?.description.length > 500 ? video.description.substring(0, 500) + "..." : video.description
										}
										rows={10}
										readOnly
									/>
								) : (
									""
								)}
							</VideoInfo>
						</PlayerArea>
					) : (
						<TimeUpMessage>
							<SentimentVeryDissatisfiedOutlined />
							Dear User you have used time quota for today. Please give yourself some time to relax and then come back
							to watch more videos. <p>{!time?.availed_time ? "You can get 2 more hours... visit settings" : ""}</p>
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

import React, { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoGrid from "components/VideoGrid";
import Clock from "components/Clock";
import { DashboardContext } from "context/DashboardContext";
import {
	Container,
	PlayerArea,
	PlayerContainer,
	TextArea,
	TimerTypography,
	TimeUpMessage,
	VideoInfo,
} from "pages/PlayerScreen/emotion";
import YouTube from "components/YouTube";
import { LinearProgress, Typography } from "@mui/material";
import { SentimentVeryDissatisfiedOutlined } from "@mui/icons-material";
import { getTimerAction, getVideoByIdAction, setTimeAction } from "pages/PlayerScreen/services";
import { IRunningTime, ITimer } from "types/Timer";
import { CountdownRenderProps } from "react-countdown";
import { convertIntoHours } from "utils";

interface VideoValues {
	embedHTML: string;
	title: string;
	description: string;
}

const PlayerScreen: FC = () => {
	const { videoId } = useParams() as { videoId: string };
	const playlist = useContext(DashboardContext);
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
			setTime(undefined);


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
		<Container>
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
												video?.description.length > 500
													? video.description.substring(0, 500) + "..."
													: video.description
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
						<Clock time={time} render={render} />
					</PlayerContainer>
				) : (
					<LinearProgress />
				)}
			</>

			<VideoGrid playlist={playlist} />
		</Container>
	);
};

export default PlayerScreen;

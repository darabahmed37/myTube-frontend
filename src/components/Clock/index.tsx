import React, { FC } from "react";
import { H3 } from "elements/Typography";
import { Divider } from "@mui/material";
import { ITimer } from "types/Timer";
import RClock, { CountdownRendererFn } from "react-countdown";
import { convertHoursToMilliseconds } from "utils";
import { ClockDiv, CountDownBox } from "components/Clock/emotion";
interface IClockProps{
	time:ITimer|undefined
	render: CountdownRendererFn;
}
const Clock: FC<IClockProps> = ({time,render}) => {
	return (
		<>
			<CountDownBox>
				<H3>Time Remaining</H3>
				<Divider />
				<ClockDiv>
					{time&&time.total_time ? (
						<RClock date={Date.now() + convertHoursToMilliseconds(time.total_time)} renderer={render} />
					) : (
						""
					)}
				</ClockDiv>
			</CountDownBox>
		</>
	);
};

export default Clock;
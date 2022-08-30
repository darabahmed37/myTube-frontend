import React, { FC, useEffect } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ITimer } from "types/Timer";
import { convertToTime, getPreviousTimers } from "pages/Statistics/service";
import { StatH1, TimeChart } from "pages/Statistics/emotion";

const Statistics: FC = () => {
	const [data, setData] = React.useState<ITimer[]>([]);
	useEffect(() => {
		getPreviousTimers().then((output) => {
			setData(output);
		});
	}, []);

	return (
		<>
			<StatH1>Statistics</StatH1>
			<TimeChart>
				<LineChart width={600} height={300} data={data}>
					<Line type="monotone" dataKey="total_time" stroke="#8884d8" />
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<XAxis dataKey="date" />
					<YAxis domain={[0, 4]} tickFormatter={(value) => convertToTime(value)} tickMargin={5} />
					<Tooltip
						formatter={(...args: any) => convertToTime(args[0])}
					/>
				</LineChart>
			</TimeChart>
		</>
	);
};

export default Statistics;

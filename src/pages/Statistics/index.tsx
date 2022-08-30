import React, { FC, useEffect } from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { ITimer } from "types/Timer";
import { convertToTime, getAllTagsAction, getPreviousTimersAction } from "pages/Statistics/service";
import { Graph, StatH1, TimeChart } from "pages/Statistics/emotion";
import { H3 } from "elements/Typography";
import { ITags } from "types/Tags";

const Statistics: FC = () => {
	const [timeData, setTimeData] = React.useState<ITimer[]>([]);
	const [tagsData, setTagsData] = React.useState<ITags[]>([]);
	useEffect(() => {
		getPreviousTimersAction().then((output) => {
			setTimeData(output);
		});
		getAllTagsAction().then((output) => {
			setTagsData(output);
		});
	}, []);

	return (
		<>
			<StatH1>Statistics</StatH1>
			{timeData.length ? (
				<Graph>
					<H3>Watch Time</H3>
					<TimeChart>
						<LineChart width={600} height={300} data={timeData}>
							<Line type="monotone" dataKey="total_time" stroke="#8884d8" />
							<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
							<XAxis dataKey="date" />
							<YAxis domain={[0, 4]} tickFormatter={(value) => convertToTime(value)} tickMargin={5} />
							<Tooltip formatter={(...args: any) => convertToTime(args[0])} />
							<ReferenceLine y={2} stroke="green" />
						</LineChart>
					</TimeChart>
				</Graph>
			) : (
				""
			)}
			{tagsData.length ? (
				<Graph>
					<H3>User Tags</H3>
					<TimeChart>
						<LineChart width={600} height={300} data={tagsData}>
							<Line type="monotone" dataKey="count" stroke="#8884d8" />
							<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
							<XAxis dataKey="tag" />
							<YAxis />
							<Tooltip />
						</LineChart>
					</TimeChart>
				</Graph>
			) : (
				""
			)}
		</>
	);
};

export default Statistics;

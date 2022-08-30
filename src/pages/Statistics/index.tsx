import React, { FC, useEffect } from "react";
import {
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { ITimer } from "types/Timer";
import { convertToTime, getAllTagsAction, getPreviousTimersAction } from "pages/Statistics/service";
import { Graph, StatH1, ChatsCom } from "pages/Statistics/emotion";
import { H3 } from "elements/Typography";
import { ITags } from "types/Tags";

const Statistics: FC = () => {
	const [timeData, setTimeData] = React.useState<ITimer[]>([]);
	const [tagsData, setTagsData] = React.useState<ITags[]>([]);
	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#ab47bc","#f73378","#3f51b5"];

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = (props: any) => {
		const { cx, cy, midAngle, innerRadius, outerRadius, name } = props;
		const radius = innerRadius + (outerRadius - innerRadius) + 30;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
				{name}
			</text>
		);
	};

	useEffect(() => {
		getPreviousTimersAction().then((output) => {
			setTimeData(output);
		});
		getAllTagsAction().then((output) => {
			setTagsData(output);
			console.log(output);
		});
	}, []);

	return (
		<>
			<StatH1>Statistics</StatH1>
			{timeData.length ? (
				<Graph>
					<H3>Watch Time</H3>
					<ChatsCom>
						<LineChart width={600} height={300} data={timeData}>
							<Line type="monotone" dataKey="total_time" stroke="#8884d8" />
							<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
							<XAxis dataKey="date" />
							<YAxis domain={[0, 4]} tickFormatter={(value) => convertToTime(value)} tickMargin={5} />
							<Tooltip formatter={(...args: any) => convertToTime(args[0])} />
							<ReferenceLine y={2} stroke="green" />
						</LineChart>
					</ChatsCom>
				</Graph>
			) : (
				""
			)}
			{tagsData.length ? (
				<Graph>
					<H3>User Tags</H3>
					<ChatsCom sx={{
						margin:"auto"
					}}>
						<ResponsiveContainer height={300} width={"100%"}>
							<PieChart width={500} height={700}>
								<Pie
									data={tagsData}
									labelLine={true}
									dataKey="count"
									nameKey="tag"
									cx="50%"
									cy="50%"
									outerRadius={"70%"}
									fill="#8884d8"
									label={renderCustomizedLabel}
								>
									{tagsData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</ChatsCom>
				</Graph>
			) : (
				""
			)}
		</>
	);
};

export default Statistics;

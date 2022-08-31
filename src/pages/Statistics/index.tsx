import React, { FC, useEffect, useRef } from "react";
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
import { ChatsCom, Graph, PieSxProps, StatH1, StatPage } from "pages/Statistics/emotion";
import { H3 } from "elements/Typography";
import { ITags } from "types/Tags";

const Statistics: FC = () => {
	const [timeData, setTimeData] = React.useState<ITimer[]>([]);
	const [tagsData, setTagsData] = React.useState<ITags[]>([]);
	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#ab47bc", "#3f51b5"];
	const total = useRef<number>(0);
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
		Promise.all([getPreviousTimersAction(), getAllTagsAction()]).then(([timeData, tagsData]) => {
			setTimeData(timeData);
			setTagsData(tagsData);
			total.current = tagsData.reduce((acc, curr) => {
				return acc + curr.count;
			}, 0);
			total.current/=100;
		});
	}, []);

	return (
		<StatPage>
			<div>
				<StatH1>Statistics</StatH1>
				{timeData.length ? (
					<Graph>
						<H3>Watch Time</H3>
						<ChatsCom>
							<ResponsiveContainer height={"100%"} width={"100%"}>
								<LineChart data={timeData}>
									<Line type="monotone" dataKey="total_time" stroke="#8884d8" />
									<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
									<XAxis dataKey="date" />
									<YAxis domain={[0, 4]} tickFormatter={(value) => convertToTime(value)} tickMargin={5} />
									<Tooltip formatter={(...args: any) => convertToTime(args[0])} />
									<ReferenceLine y={2} stroke="green" />
								</LineChart>
							</ResponsiveContainer>
						</ChatsCom>
					</Graph>
				) : (
					""
				)}
			</div>
			<div>
				{tagsData.length ? (
					<Graph>
						<H3>Top Watched</H3>
						<ChatsCom sx={PieSxProps}>
							<ResponsiveContainer height={"100%"} width={"100%"}>
								<PieChart>
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
									<Tooltip
										formatter={(value:number) => {
											return `${Math.round(value / total.current)}%`;
										}}
									/>
								</PieChart>
							</ResponsiveContainer>
						</ChatsCom>
					</Graph>
				) : (
					""
				)}
			</div>
		</StatPage>
	);
};

export default Statistics;

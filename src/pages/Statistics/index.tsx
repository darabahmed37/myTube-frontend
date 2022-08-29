import { H1 } from "elements/Typography";
import React, { FC, useEffect } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ITimer } from "types/Timer";
import { getPreviousTimers } from "pages/Statistics/service";
import { TimeChart } from "pages/Statistics/emotion";

const Statistics: FC = () => {
	const [data, setData] = React.useState<ITimer[]>([]);
	useEffect(() => {
		getPreviousTimers().then((output) => {
			setData(output);
		});
	}, []);

	return (
		<>
			<H1>Statistics</H1>
			<TimeChart>
				<LineChart width={600} height={300} data={data}>
					<Line type="monotone" dataKey="total_time" stroke="#8884d8" />
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
				</LineChart>
			</TimeChart>
		</>
	);
};

export default Statistics;

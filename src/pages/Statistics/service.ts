import { getPreviousTimer } from "api/timer";
import { ITimer } from "types/Timer";

export async function getPreviousTimers() {
	const response: ITimer[] = (await getPreviousTimer()).data;
	const output: ITimer[] = [];
	response.forEach((timer) => {
		const date: string = new Date(timer.date).toLocaleDateString();
		const total_time: number = 4 - timer.total_time;
		const availed_time: boolean = timer.availed_time;
		output.push({ date, total_time, availed_time });
	});
	return output;
}


//convert decimal to time
export function convertToTime(decimal: number) {
	const hours = Math.floor(decimal);
	const minutes = Math.floor((decimal - hours) * 60);
	return `${hours}:${minutes}`;
}
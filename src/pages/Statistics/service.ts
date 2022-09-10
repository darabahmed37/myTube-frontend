import { getPreviousTimer } from "api/timer";
import { ITimer } from "types/Timer";
import { getAllTags } from "api/tags";
import { ITags } from "types/Tags";

export async function getPreviousTimersAction() {
	const response: ITimer[] = (await getPreviousTimer()).data;
	const output: ITimer[] = [];
	response.forEach((timer) => {
		const date: string = new Date(timer.date).toLocaleDateString();
		let total_time: number = 4 - timer.total_time;
		const availed_time: boolean = timer.availed_time;
		if (!availed_time){
			total_time -= 2;
		}
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

export async function getAllTagsAction() {
	const response = await getAllTags();
	return response.data as ITags[];
}

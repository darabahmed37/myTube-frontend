import { getTimer, newTimer, setTimer } from "api/timer";
import { AxiosResponse } from "axios";
import { IRunningTime, ITimer } from "types/Timer";

export async function getTimerAction() {
	let response: AxiosResponse;
	try {
		response = await getTimer();
		return response.data as ITimer;
	} catch (e) {
		// @ts-ignore
		response = e.response;

		return (await newTimer()).data as ITimer;
	}
}

export async function setTimeAction(time: number) {
	try {
		await setTimer(time);
	} catch (e) {
		console.error(e);
	}
}

export function convertHoursToMilliseconds(hours: number) {
	return hours * 60 * 60 * 1000;
}

//convert hours ,minutes and seconds with decimal hour
export function convertIntoHours(time: IRunningTime) {
	const { hours, minutes, seconds } = time;
	return hours + minutes / 60 + seconds / 3600;
}

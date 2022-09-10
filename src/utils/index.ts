import { IRunningTime } from "types/Timer";

export function isValidEmail(email: string): boolean {
	return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function convertHoursToMilliseconds(hours: number) {
	return hours * 60 * 60 * 1000;
}

//convert hours ,minutes and seconds with decimal hour
export function convertIntoHours(time: IRunningTime) {
	const { hours, minutes, seconds } = time;
	return hours + minutes / 60 + seconds / 3600;
}
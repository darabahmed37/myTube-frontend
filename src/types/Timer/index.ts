export interface ITimer {
	total_time: number;
	date: string;
	user?: string;
	availed_time: boolean;
}

export interface IRunningTime {
	hours: number;
	minutes: number;
	seconds: number;
}

import { getTimer, newTimer, setTimer } from "api/timer";
import { AxiosResponse } from "axios";
import { ITimer } from "types/Timer";
import { IYouTubeVideo } from "types/YouTube";
import { getVideoById } from "api/youtube";

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

export async function getVideoByIdAction(id: string) {
	const videoTemp: IYouTubeVideo = (await getVideoById(id as string)).data;
	return {
		embedHTML: videoTemp.items[0].player.embedHtml,
		title: videoTemp.items[0].snippet.title,
		description: videoTemp.items[0].snippet.description,
	};
}

import { getRequest, patchRequest, postRequest } from "api/axios";
import { TimerRoutes } from "api/timer/routes";

export function getTimer() {
	return getRequest(TimerRoutes.CURRENT_TIMER);
}

export function setTimer(updatedTimer: number) {

	return patchRequest(TimerRoutes.CURRENT_TIMER, {
		total_time: updatedTimer,
	});
}


export function newTimer() {
	return postRequest(TimerRoutes.NEW_TIMER);
}

export function getPreviousTimer() {
	return getRequest(TimerRoutes.PREVIOUS_TIMER);
}

export function increaseCurrentTime() {
	return patchRequest(TimerRoutes.CURRENT_TIMER, {
		availed_time: true,
	});
}
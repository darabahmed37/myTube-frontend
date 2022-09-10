import { changePassword, deleteUser } from "api/auth";
import { getAllPlayLists, setUserPlaylist } from "api/youtube";
import { IYouTubePlayListItems } from "types/YouTube";
import { increaseCurrentTime } from "api/timer";

export async function changePasswordAction(password: string): Promise<string> {
	return (await changePassword(password)).data.message;
}

export async function getAllPlayListsAction() {
	let data: IYouTubePlayListItems;
	try {
		data = (await getAllPlayLists()).data;
		return data;
	} catch (e) {
		console.error(e);
	}
}

export async function setUserPlaylistAction(playlistId: string) {
	try {
		await setUserPlaylist(playlistId);
	} catch (e) {
		console.error(e);
	}
}

export async function deleteUserAction(event: any) {
	try {
		await deleteUser();
		window.location.href = "/";
	} catch (e) {
		console.error(e);
	}
}

export async function increaseTimeAction() {
	try {
		await increaseCurrentTime();
	} catch (e) {
		console.error(e);
	}
}

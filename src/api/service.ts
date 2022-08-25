import { refreshAccessToken } from "api/auth";
import { logOut, setAccessToken } from "utils/user";

export async function refreshAccessTokenAction() {
	const refreshToken = localStorage.getItem("refresh");
	if (refreshToken) {
		try {
			const response = await refreshAccessToken(refreshToken);

			await setAccessToken(response.data.access);
			return response.data.access as string;
		} catch (e) {
			console.error(e);
			logOut();
		}
	} else {
		logOut();
	}
}

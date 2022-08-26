import { getAccessTokenFromGoogle } from "api/auth";
import { setAccessToken, setRefreshToken } from "utils/user";
import { AxiosResponse } from "axios";
import { handleGoogleRedirectAction } from "pages/Auth/service";

export async function getAccessTokenFromGoogleAction(code: string) {
	try {
		let response = await getAccessTokenFromGoogle(code);
		setAccessToken(response.data.access);
		setRefreshToken(response.data.refresh);
	} catch (e) {
		// @ts-ignore
		let response = e.response as AxiosResponse;

		if (response.status === 307) {
			const { redirectUrl } = response.data;
			await handleGoogleRedirectAction(redirectUrl);
		}
	}
}

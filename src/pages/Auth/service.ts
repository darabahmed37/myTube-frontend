import { AxiosResponse } from "axios";
import { setAccessToken, setRefreshToken } from "utils/user";
import {
	getGoogleAuthUrl,
	handleRedirectGoogle,
	signInWithEmailAndPassword,
	signUpWithEmailAndPassword,
} from "api/auth";

export async function signInWithEmailAndPasswordAction(email: string, password: string): Promise<void> {
	const response = await signInWithEmailAndPassword(email, password);
	setAccessToken(response.data.access);
	setRefreshToken(response.data.refresh);
}

export async function signUpWithEmailAndPasswordAction(email: string, password: string): Promise<AxiosResponse> {
	return signUpWithEmailAndPassword(email, password);
}

export async function getGoogleAuthUrlAction(): Promise<void> {
	try {
		const response = await getGoogleAuthUrl();
		window.location.href = response.data.authorization_url;
	} catch (error) {
		console.log(error);
	}
}

export async function handleGoogleRedirectAction(redirectURL: string) {
	try {
		const response = await handleRedirectGoogle(redirectURL);

		window.location.href = response.data.authorization_url;
	} catch (error) {
		console.log(error);
	}
}

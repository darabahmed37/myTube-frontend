import axios from "../../axios";
import {AxiosResponse} from "axios";

export async function googleNewToken(response: AxiosResponse) {
	if (response.status === 307) {
		const {redirectUrl} = response.data

		window.location.href = (
			await axios.get(redirectUrl)
		).data.authorization_url
	}
}
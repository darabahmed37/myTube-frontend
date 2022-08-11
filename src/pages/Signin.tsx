import React, {FC} from "react"
import Home from "../layouts/Home"
import axios from "utils/axios"
import {AxiosResponse} from "axios"

// @ts-ignore
async function request(
	email: string,
	password: string
): Promise<boolean | undefined> {
	let response: AxiosResponse
	try {
		response = await axios.post("auth/sign-in/", {
			email,
			password,
		})

		if (response.status === 200) {
			localStorage.setItem("access", response.data.access)
			localStorage.setItem("refresh", response.data.access)
			return true
		}
	} catch (e) {
		// @ts-ignore
		throw e
	}
}

const Signin: FC = () => {
	return (
		<>
			<Home
				title={"Login"}
				buttonText={"Get Started"}
				googleTitle={"Signin"}
				navigation={{
					title: "Don't have an Account",
					linkText: "Signup",
					link: "/sign-up",
				}}
				requestFunction={request}
			/>
		</>
	)
}

export default Signin

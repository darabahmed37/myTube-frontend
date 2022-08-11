import React, {FC} from "react"
import Home from "../layouts/Home"
import axios from "utils/axios"

async function request(email: string, password: string): Promise<boolean | undefined> {
	await axios.post(`auth/sign-up/`, {
		email, password,
	})
	return true
}

const Signup: FC = () => {
	return (<>
		<Home
			title={"Create An Account"}
			buttonText={"Get Started"}
			googleTitle={"Signup"}
			navigation={{
				title: "Already Have An Account", linkText: "Signin", link: "/sign-in",
			}}
			requestFunction={request}
		/>
	</>)
}

export default Signup

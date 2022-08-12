import React, { FC } from "react"
import AuthenticateLayout from "layouts/AuthenticateLayout"
import { signUpWithEmailAndPassword } from "api/auth"

const Signup: FC = () => {
	return (
		<>
			<AuthenticateLayout
				title={"Create An Account"}
				buttonText={"Get Started"}
				googleTitle={"Signup"}
				navigation={{
					title: "Already Have An Account",
					linkText: "Signin",
					link: "/sign-in",
				}}
				requestFunction={signUpWithEmailAndPassword}
			/>
		</>
	)
}

export default Signup

import React, { FC } from "react"
import AuthenticateLayout from "layouts/AuthenticateLayout"
import { signInWithEmailAndPassword } from "api/auth"

const Signin: FC = () => {
	return (
		<>
			<AuthenticateLayout
				title={"Login"}
				buttonText={"Get Started"}
				googleTitle={"Signin"}
				navigation={{
					title: "Don't have an Account",
					linkText: "Signup",
					link: "/sign-up",
				}}
				requestFunction={signInWithEmailAndPassword}
			/>
		</>
	)
}

export default Signin

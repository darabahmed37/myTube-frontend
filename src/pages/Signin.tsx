import React, { FC } from "react"
import Home from "../layouts/Home"

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
					link: "/signup",
				}}
				requestFunction={() => {}}
			/>
		</>
	)
}

export default Signin

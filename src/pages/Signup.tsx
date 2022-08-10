import React, { FC } from "react"
import Home from "../layouts/Home"
import Box from "@mui/material/Box"

const Signup: FC = () => {
	return (
		<>
			<Home
				title={"Create An Account"}
				buttonText={"Get Started"}
				googleTitle={"Signup"}
				navigation={{
					title: "Already Have An Account",
					linkText: "Signin",
					link: "/sign-in",
				}}

			/>
		</>
	)
}

export default Signup

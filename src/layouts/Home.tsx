import React, { ChangeEvent, FC } from "react"
import "./home.scss"
import GoogleButton from "react-google-button"
import { Link as MuiLink, TextField } from "@mui/material"
import { RoundedButton } from "../elements/button"
import { useNavigate } from "react-router-dom"
import { HomeContainer, HomeMain, InputForm, Left, Right } from "./Homestyles"
import { AxiosError, AxiosResponse } from "axios"
import axios from "../axios"

export interface IHome {
	title: string
	googleTitle: string
	buttonText: string
	navigation: {
		title: string
		linkText: string
		link: string
	}
	requestFunction: (
		email: string,
		password: string
	) => Promise<boolean | AxiosError>
}

interface ICredentials {
	email: string
	password: string
}

interface IValidation {
	helperText: string
	error: boolean
}

const Home: FC<IHome> = ({
	title,
	googleTitle,
	buttonText,
	navigation,
	requestFunction,
}) => {
	const [credentialsForm, setCredentialsForm] = React.useState<ICredentials>({
		email: "",
		password: "",
	})
	const [emailValidation, setEmailValidation] = React.useState<IValidation>({
		helperText: "",
		error: false,
	})
	const [passwordValidation, setPasswordValidation] =
		React.useState<IValidation>({
			helperText: "",
			error: false,
		})

	function isValidEmail(email: string): boolean {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
	}

	function validation(): boolean {
		if (
			isValidEmail(credentialsForm.email) ||
			credentialsForm.email.length === 0
		) {
			setEmailValidation(() => ({
				error: false,
				helperText: "",
			}))
		} else {
			setEmailValidation(() => ({
				error: true,
				helperText: "Please enter a valid email",
			}))
		}
		if (
			credentialsForm.password.length > 6 ||
			credentialsForm.password.length === 0
		) {
			setPasswordValidation(() => ({
				error: false,
				helperText: "",
			}))
		} else {
			setPasswordValidation(() => ({
				error: true,
				helperText: "Password must be at least 7 characters",
			}))
		}
		return !(emailValidation.error && passwordValidation.error)
	}

	async function signin() {
		try {
			// @ts-ignore
			const r = await requestFunction(
				credentialsForm.email,
				credentialsForm.password
			)

			navigate("/")
		} catch (e) {
			// @ts-ignore
			const response = e.response as AxiosResponse
			if (response?.status === 403) {
				setPasswordValidation({
					error: true,
					helperText: "Invalid password",
				})
			} else if (response?.status === 404) {
				setEmailValidation({
					error: true,
					helperText: "User not found",
				})
			} else if (response?.status === 307) {
				const { redirectUrl } = response.data

				const newResponse = await axios.get(redirectUrl)

				window.location.href = newResponse.data.authorization_url
			} else {
				console.error("Unhandled Error")
			}
		}
	}

	async function signUp() {
		try {
			await requestFunction(credentialsForm.email, credentialsForm.password)
			navigate("/sign-in")
		} catch (e) {
			// @ts-ignore
			const response = e.response as AxiosResponse
			if (response.status === 409) {
				setEmailValidation({
					error: true,
					helperText: "User already exists",
				})
			}
		}
	}

	const formSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()

		if (credentialsForm.email.length === 0) {
			setEmailValidation({
				error: true,
				helperText: "Please enter an email",
			})
			return
		}
		if (credentialsForm.password.length === 0) {
			setPasswordValidation({
				error: true,
				helperText: "Please enter a password",
			})
			return
		}

		if (validation()) {
			if (googleTitle === "Signin") {
				await signin()
			} else if (googleTitle === "Signup") {
				await signUp()
			}
		}
	}

	function onStateChange(
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		setCredentialsForm({
			...credentialsForm,
			[event.target.name]: event.target.value,
		})
	}

	React.useEffect(() => {
		validation()
	}, [credentialsForm])
	const navigate = useNavigate()

	return (
		<HomeMain>
			<HomeContainer>
				<Left item container lg={6}>
					<div>
						<h2>My Tube</h2>
					</div>
					<div>
						<span className={"light-text"}>{title}</span>
					</div>
					<div>
						<GoogleButton
							onClick={() => {
								axios.get("auth/login-with-google/").then((r) => {
									if (r.status === 200) {
										window.location.href = r.data.authorization_url
									}
								})
							}}
							label={googleTitle + " with Google"}
							type={"light"}
						/>
					</div>
					<div>
						<p className={"light-text"}>OR</p>
					</div>
					<InputForm onSubmit={formSubmit}>
						<TextField
							fullWidth
							error={emailValidation.error}
							size={"small"}
							helperText={emailValidation.helperText}
							variant={"standard"}
							name={"email"}
							label={"Email"}
							value={credentialsForm.email}
							onChange={onStateChange}
						/>
						<TextField
							error={passwordValidation.error}
							helperText={passwordValidation.helperText}
							name={"password"}
							size={"small"}
							variant={"standard"}
							type={"password"}
							value={credentialsForm.password}
							onChange={onStateChange}
							label="Password"
						/>

						<RoundedButton
							sx={{
								margin: "0 auto",
							}}
							type={"submit"}
						>
							{buttonText}
						</RoundedButton>
					</InputForm>

					<div
						style={{
							fontSize: ".8rem",
							transform: "translateY(4rem)",
						}}
					>
						{navigation.title + " "}

						<MuiLink
							sx={{
								cursor: "pointer",
								textDecoration: "none",
								"&:hover": {
									textDecoration: "underline",
								},
							}}
							onClick={() => {
								navigate(navigation.link)
							}}
						>
							{navigation.linkText}
						</MuiLink>
					</div>
				</Left>
				<Right lg={6} item container></Right>
			</HomeContainer>
		</HomeMain>
	)
}
export default Home

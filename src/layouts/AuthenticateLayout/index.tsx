import React, { ChangeEvent, FC, FormEventHandler, useEffect, useState } from "react"

import GoogleButton from "react-google-button"
import { Link as MuiLink, TextField } from "@mui/material"
import { RoundedButton } from "elements/button"
import { useNavigate } from "react-router-dom"
import {
	HomeContainer,
	HomeMain,
	InputForm,
	Left,
	lightText,
	Link,
	navigationTitle,
	Right,
} from "layouts/AuthenticateLayout/styles"
import { AxiosResponse } from "axios"
import { getGoogleAuthUrl } from "api/auth"
import axios from "api/axios"

export interface IHome {
	title: string
	googleTitle: string
	buttonText: string
	navigation: {
		title: string
		linkText: string
		link: string
	}
	requestFunction: (email: string, password: string) => Promise<AxiosResponse>
}

interface ICredentials {
	email: string
	password: string
}

interface IValidation {
	helperText: string
	error: boolean
}

const AuthenticateLayout: FC<IHome> = ({ title, googleTitle, buttonText, navigation, requestFunction }) => {
	const [credentialsForm, setCredentialsForm] = useState<ICredentials>({
		email: "",
		password: "",
	})
	const [emailValidation, setEmailValidation] = useState<IValidation>({
		helperText: "",
		error: false,
	})
	const [passwordValidation, setPasswordValidation] = useState<IValidation>({
		helperText: "",
		error: false,
	})

	function isValidEmail(email: string): boolean {
		return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
	}

	function validation(): boolean {
		if (isValidEmail(credentialsForm.email) || credentialsForm.email.length === 0) {
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
		if (credentialsForm.password.length > 6 || credentialsForm.password.length === 0) {
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
		let response: AxiosResponse
		try {
			// @ts-ignore
			await requestFunction(credentialsForm.email, credentialsForm.password)

			navigate("/")
		} catch (e) {
			// @ts-ignore
			response = e.response as AxiosResponse
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
			} else if (response.status === 307) {
				response = await axios.get(response.data.redirectUrl)
				window.location.href = response.data.authorization_url
			}
		}
	}

	async function signUp() {
		let response: AxiosResponse
		try {
			response = await requestFunction(credentialsForm.email, credentialsForm.password)
			navigate("/sign-in")
		} catch (e) {
			// @ts-ignore
			response = e.response as AxiosResponse
			if (response.status === 409) {
				setEmailValidation({
					error: true,
					helperText: "User already exists",
				})
			}
		}
	}

	const formSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
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

	function onStateChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
		setCredentialsForm({
			...credentialsForm,
			[event.target.name]: event.target.value,
		})
	}

	useEffect(() => {
		validation()
	}, [credentialsForm]) // eslint-disable-line react-hooks/exhaustive-deps

	const navigate = useNavigate()

	return (
		<HomeMain>
			<HomeContainer>
				<Left item container lg={6}>
					<div>
						<h2>My Tube</h2>
					</div>
					<div>
						<span style={lightText}>{title}</span>
					</div>
					<div>
						<GoogleButton
							onClick={async () => {
								await getGoogleAuthUrl()
							}}
							label={googleTitle + " with Google"}
							type={"light"}
						/>
					</div>
					<div>
						<p style={lightText}>OR</p>
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

						<RoundedButton type={"submit"}>{buttonText}</RoundedButton>
					</InputForm>

					<div style={navigationTitle}>
						{navigation.title + " "}

						<MuiLink
							sx={Link}
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
export default AuthenticateLayout

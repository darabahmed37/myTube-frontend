import React, {FC, useEffect} from "react"
import Typography from "@mui/material/Typography"
import {useLocation, useNavigate} from "react-router-dom"
import queryString from "query-string"
import axios from "../axios"
import {AxiosResponse} from "axios"
import {googleNewToken} from "../utils/auth"

const Redirecting: FC = () => {
	const location = useLocation()
	const navigate = useNavigate()

	async function googleAuthentication() {
		const query = queryString.parse(location.search)
		const {code} = query
		try {

			const r = await axios.post("/auth/oauth2callback/", {code})
			localStorage.setItem("access", r.data.access)
			localStorage.setItem("refresh", r.data.refresh)
			navigate("/")
		} catch (e) {
			// @ts-ignore
			const response = e.response as AxiosResponse


			await googleNewToken(response)
		}
	}

	useEffect(() => {
		googleAuthentication().then(() => {
		})
	})
	return <Typography variant={"h2"}>Redirecting...</Typography>
}

export default Redirecting

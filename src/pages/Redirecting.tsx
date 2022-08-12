import React, { FC, useEffect } from "react"
import Typography from "@mui/material/Typography"
import { useLocation, useNavigate } from "react-router-dom"
import queryString from "query-string"
import { getAccessTokenFromGoogle } from "api/auth"

const Redirecting: FC = () => {
	const location = useLocation()
	const navigate = useNavigate()

	async function googleAuthentication() {
		const query = queryString.parse(location.search)
		const { code } = query
		await getAccessTokenFromGoogle(code as string)
		navigate("/")
	}

	useEffect(() => {
		googleAuthentication().then(() => {})
	})
	return <Typography variant={"h2"}>Redirecting...</Typography>
}

export default Redirecting

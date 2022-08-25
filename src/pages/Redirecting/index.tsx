import React, { FC, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { getAccessTokenFromGoogleAction } from "pages/Redirecting/service";

const Redirecting: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	async function googleAuthentication() {
		const query = queryString.parse(location.search);
		const { code } = query;
		await getAccessTokenFromGoogleAction(code as string);
		navigate("/");
	}

	useEffect(() => {
		googleAuthentication().then(() => {});
	});
	return <Typography variant={"h2"}>Redirecting...</Typography>;
};

export default Redirecting;

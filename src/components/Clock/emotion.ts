import styled from "@mui/material/styles/styled";
import { Paper } from "@mui/material";
import { H3 } from "elements/Typography";

export const CountDownBox = styled(Paper)`
	height: 15em;
	flex: 0.2;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 1em;
	margin-top: 4em !important;
	max-width: 16em;
	transform: translateX(-1.6em);

	${H3} {
		padding: 1.2em;
	}

	& .MuiDivider-root {
		height: 1px;
		width: 100%;
	}
`;
export const ClockDiv = styled("div")`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transform: translateY(-1em);
	min-width: 15em;

	${(props) => props.theme.breakpoints.down("md")} {
		height: 10em;
	}
`;
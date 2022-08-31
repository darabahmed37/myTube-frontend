import { Box, styled, SxProps } from "@mui/material";
import { H1, H3 } from "elements/Typography";

export const ChatsCom = styled(Box)`
	flex: 1;

	${(props) => props.theme.breakpoints.down("md")} {
		max-width: 90%;
		height: 200px;
		transform: translateX(-1.5em);
	}

	${(props) => props.theme.breakpoints.up("md")} {
		max-width: 50%;
		height: 250px;
	}
`;

export const StatH1 = styled(H1)`
	margin-left: 2em;
	margin-top: 2em;
`;

export const Graph = styled(Box)`
	position: relative;

	${H3} {
		margin-top: 2em;
		margin-bottom: 3em;
		margin-left: 2em;

		${(props) => props.theme.breakpoints.down("md")} {
			text-align: center;
			margin-left: 0;
		}
	}
`;

export const StatPage = styled(Box)`
	max-width: 100vw;

	&::-webkit-scrollbar {
		display: none;
	}

	overflow-x: hidden;
`;
export const PieSxProps: SxProps = {
	transform: "none !important",
};

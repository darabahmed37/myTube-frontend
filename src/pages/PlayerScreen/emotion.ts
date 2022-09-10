import { Box, Paper, Typography } from "@mui/material";
import styled from "@mui/material/styles/styled";

export const PlayerArea = styled(Paper)`
	padding: 1em;
	margin-bottom: 1em;
	display: flex;
	flex-direction: column;
	gap: 2em;
	flex: 0.72;
	max-width: 80%;

	${({ theme }) => theme.breakpoints.down("md")} {
		min-width: 100%;
		box-shadow: none;
		background: transparent;
		padding: 0;
		margin-bottom: 0;

		& > h5 {
			margin-left: 1em;
		}
	}
`;

export const TextArea = styled(Typography)`
	outline: none;
	border: none;
	background: transparent;
	resize: none;

	&::-webkit-scrollbar {
		display: none;
	}
`.withComponent("textarea");

TextArea.defaultProps = {
	variant: "body1",
};

export const PlayerContainer = styled(Box)`
	display: flex;
	justify-content: space-between;

	${(props) => props.theme.breakpoints.down("md")} {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	width: 100%;
`;

export const TimerTypography = styled(Typography)`
	color: ${(props) => props.theme.palette.primary.main};
`;

export const TimeUpMessage = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	max-width: 100%;
	margin-right: 2em;
	color: ${(props) => props.theme.palette.error.main};
	font-size: 1.5rem;

	p {
		color: ${(props) => props.theme.palette.warning.main};
		font-weight: 600;
	}

	& .MuiSvgIcon-root {
		font-size: 12rem;
	}
`;

export const VideoInfo = styled(Box)`
	padding: 1em;
	display: flex;
	flex-direction: column;
	gap: 1em;
`;

export const Container = styled("div")`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	gap: 4em;
`;

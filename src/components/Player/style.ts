import { Box as MuiBox, SxProps } from "@mui/material";
import styled from "@emotion/styled/macro";

export const PaperSx: SxProps = {
	p: "1rem",
	mb: "1rem",
	background: "#FBF9F9",
	display:"flex",
	flexDirection:"column",
	gap:"2rem",
};

export const Box = styled(MuiBox)`
	min-width: 90%;
`;

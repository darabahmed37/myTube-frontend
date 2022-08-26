import styled from "@emotion/styled/macro";
import { Typography } from "@mui/material";

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
	rows:18

};
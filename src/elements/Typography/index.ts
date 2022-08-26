import { Typography } from "@mui/material";
import styled from "@emotion/styled/macro";

export const H1 = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
`;

export const H2 = styled(Typography)`
  font-size: 1.6rem;
  font-weight: 700;
`;

export const H3 = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 700;
`;

H1.defaultProps = {
	variant: "h1",
};
export const Body1 = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 400;
	
`;

Body1.defaultProps = {
	variant: "body1",
};
H2.defaultProps = {
	variant: "h2",
};
H3.defaultProps = {
	variant: "h3",
};

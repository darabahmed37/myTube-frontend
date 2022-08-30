import { Box, styled } from "@mui/material";
import { H1, H3 } from "elements/Typography";

export const TimeChart = styled(Box)`
  margin-top: 4em;
  display: flex;
  width: 100%;

  align-items: center;
`;

export const StatH1 = styled(H1)`
  margin-left: 2em;
  margin-top: 2em;
`;

export const Graph = styled(Box)`
  ${H3} {
    margin-top: 2em;
    margin-left: 3.5em;
  }
`;

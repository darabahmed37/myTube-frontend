import styled from "@emotion/styled/macro";
import CountdownReact from "react-countdown";
import { Paper } from "@mui/material";
import { H3 } from "elements/Typography";

export const Container = styled("div")`
  display: flex;
  align-items: flex-start;
  max-width: 80vw;
  flex-direction: column;
  gap: 4em;
`;

export const Clock = styled(CountdownReact)``;
export const CountDownBox = styled(Paper)`
  height: 15em;

  min-width: 15em;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1em;
  margin-top: 4em !important;

  ${H3} {
    padding: 1.2em;
  }

  & .MuiDivider-root {
    height: 1px;
    width: 100%;
  }
`;

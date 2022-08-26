import { Box, Paper, Typography } from "@mui/material";
import { H3 } from "elements/Typography";
import CountdownReact from "react-countdown";
import styled from "@mui/material/styles/styled";

export const PlayerArea = styled(Paper)`
  padding: 1em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  gap: 2em;
  flex: 0.8;
	max-width: 80%;
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
	rows: 18,
};

export const Clock = styled(CountdownReact)``;
export const CountDownBox = styled(Paper)`
  height: 15em;
  flex: 0.2;
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

export const PlayerContainer = styled(Box)`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

export const TimerTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.primary.main};
`;

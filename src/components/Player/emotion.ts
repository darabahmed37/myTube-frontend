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
  flex: 0.72;
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
};

export const Clock = styled(CountdownReact)``;
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

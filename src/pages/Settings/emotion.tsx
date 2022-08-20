import { styled } from "@mui/material"

export const SettingsOption = styled("div")`


  & .MuiTypography-body1 {
    margin-left: 1.5em;

    span {
      color: ${props => props.theme.palette.error.main};
      font-weight: 500;
    }
  }
`


export const SettingsContainer = styled("div")`
  width: 100%;
  height: 100%;

`
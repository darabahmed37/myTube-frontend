import { Box, Button, FormGroup, Input as MuiInput } from "@mui/material"
import { Body1 } from "elements/Typography"
import styled from "@emotion/styled/macro"
import { theme } from "theme"

export const SettingsContainer = styled(Box)`
  margin-top: 1.5rem;
  margin-left: 0.5rem;
`

export const SettingItems = styled(Box)`
  margin-top: 5em;
  margin-left: 1em;
  display: flex;
  flex-direction: column;
  gap: 7em;
`

export const ItemHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1em;

  ${Body1} {
    span {
      margin-left: 0.5em;
      font-weight: 500;
      color: ${theme.palette.error.main};
    }
  }
`

export const Item = styled(Box)`
  display: flex;
  gap: 2.5em;
  flex-direction: column;
`

export const Playlist = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > span {
    margin-right: 5em;
  }
`

export const PlaylistBox = styled(Box)`
  min-width: 120px;
`

export const Input = styled(MuiInput)`
  transform: translateX(12px);
`

export const Form = styled("form")`
  max-width: 24em;
  display: flex;
  flex-direction: column;
  gap: 2.3em;

  & button {
    transform: translateX(12px);
  }
`

export const DeleteButton = styled(Button)`
  max-width: 24em;
  margin-top: 1em;

`

DeleteButton.defaultProps = {
	color: "error",
	variant: "contained",
}

export const DeleteForm=styled(FormGroup)`
user-select: none;
	
	
`



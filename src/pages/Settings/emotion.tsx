import { Box, styled } from "@mui/material"

export const SettingsContainer = styled(Box)`
  margin-top: 1.5rem;
  margin-left: 0.5rem;
`

export const SettingItems = styled(Box)`
  margin-top: 5em;
  margin-left: 1em;
`

export const ItemHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1em;

  & span {
    margin-left: 0.5em;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.error.main};
  }
`

export const Item = styled(Box)`
  display: flex;
  gap: 2.5em;
  flex-direction: column;
`

export const Playlist = styled(Box)`
  background: rebeccapurple;
`

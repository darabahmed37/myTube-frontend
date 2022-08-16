import { SxProps, Theme } from "@mui/material"

export const CardStyles: SxProps<Theme> = (theme) => ({
	display: "flex",
	padding: ".7rem",
	maxWidth: "30rem",
})

export const CardChildMaxWidth: SxProps<Theme> = (theme) => ({
	maxWidth: "50%",
})

import { SxProps, Theme } from "@mui/material"

export const CardStyles: SxProps<Theme> = (theme) => ({
	display: "flex",
	padding: ".7rem",
	maxWidth: "35rem",
	height: "100%",
})

export const CardMediaSx: SxProps<Theme> = (theme) => ({
	maxWidth: "50%",
	objectFit: "contain",
})

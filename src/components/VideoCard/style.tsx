import { SxProps, Theme } from "@mui/material"

export const CardStyles: SxProps<Theme> = (theme) => ({
	display: "flex",
	padding: ".7rem",
	maxWidth: "35rem",
	userSelect:"none",
	height: "100%",
	"&:hover": {
		cursor: "pointer",
	}
})

export const CardMediaSx: SxProps<Theme> = (theme) => ({
	maxWidth: "50%",
	objectFit: "contain",
})

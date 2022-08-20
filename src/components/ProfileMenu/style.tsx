import { PaperProps } from "@mui/material"

export const MenuPaperSxProps: Partial<PaperProps> = {
	elevation: 0,
	sx: {
		overflow: "visible",
		filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
		mt: 1.5,

		"& .MuiAvatar-root": {
			width: 32,
			height: 32,
			ml: -0.5,
			mr: 1,
		},
		"&:before": {
			content: "\"\"",
			display: "block",
			position: "absolute",
			top: 0,
			right: 14,
			width: 10,
			height: 10,
			transform: "translateY(-50%) rotate(45deg)",
			zIndex: 0,
		},
	},
}

export const MenuBoxSxProps = { display: "flex", alignItems: "center", textAlign: "center" }

import { SxProps, Theme } from "@mui/material"

export const drawerWidth = 240

export const ListItemStyle: SxProps<Theme> = {
	paddingLeft: "1rem",
	"& *": {
		color: "#fff",
	},
}

export const textWhite: SxProps<Theme> = {
	color: "#fff",
}

export const DrawerStyles: SxProps<Theme> = (theme) => ({
	width: drawerWidth,
	flexShrink: 0,
	"& .MuiDrawer-paper": {
		width: drawerWidth,
		boxSizing: "border-box",
		backgroundColor: theme.palette.secondary.main,
	},
})


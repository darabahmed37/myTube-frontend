import { styled } from "@mui/material/styles"
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar"
import MuiAppBar from "@mui/material/AppBar"
import { SxProps, Theme } from "@mui/material"

export const drawerWidth = 240

export const Main = styled("main", {
	shouldForwardProp: (prop) => prop !== "open",
})<{
	open?: boolean
}>(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}))

export interface AppBarProps extends MuiAppBarProps {
	open?: boolean
}

export const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	background: "#fff",
	color: "#000",
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

export const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}))

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

export const Profile = styled("div")`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	color: #000;
`

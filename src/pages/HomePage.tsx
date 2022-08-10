import * as React from "react"
import {useTheme} from "@mui/material/styles"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import {Divider} from "../elements/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import {OverridableComponent} from "@mui/material/OverridableComponent"
import {SvgIconTypeMap} from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"

import {AccountBoxSharp, SettingsOutlined, StackedLineChart,} from "@mui/icons-material"
import {AppBar, DrawerHeader, drawerWidth, Main} from "./HomePageStyles";
import Dashboard from "./Dashboard";

interface ListItem {
	title: string
	iconButton: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
		muiName: string
	}
}

const items: ListItem[] = [
	{
		title: "Dashboard",
		iconButton: DashboardIcon,
	},
	{
		title: "Statistics",
		iconButton: StackedLineChart,
	},
	{
		title: "Settings",
		iconButton: SettingsOutlined,
	},
	{
		title: "Account",
		iconButton: AccountBoxSharp,
	},
]

export default function HomePage() {
	const theme = useTheme()
	const [open, setOpen] = React.useState(true)

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	return (
		<Box sx={{display: "flex"}}>
			<CssBaseline/>
			<AppBar
				position="fixed"
				open={open}
				sx={{background: "#fff", color: "#000"}}
				elevation={0}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{mr: 2, ...(open && {display: "none"})}}
					>
						<MenuIcon/>
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Dashboard
					</Typography>
				</Toolbar>
				<Divider/>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
				PaperProps={{
					sx: {
						background: theme.palette.secondary.main,
					},
				}}
			>
				<DrawerHeader>
					<IconButton
						onClick={handleDrawerClose}
						sx={{
							color: "#fff",
						}}
					>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon/>
						) : (
							<ChevronRightIcon/>
						)}
					</IconButton>
				</DrawerHeader>
				<Divider/>
				<List>
					{items.map((listItem, index) => (
						<ListItem
							disablePadding
							sx={{
								paddingLeft: "1rem",
								"& *": {
									color: "#fff",
								},
							}}
							key={index}
						>
							<ListItemButton>
								<ListItemIcon sx={{minWidth: "38px"}}>
									{React.createElement(listItem.iconButton)}
								</ListItemIcon>
								<ListItemText primary={listItem.title}/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Main open={open}>
				<DrawerHeader/>

				<Dashboard/>
			</Main>
		</Box>
	)
}

import * as React from "react"
import { createElement, useState } from "react"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import { Divider } from "elements/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { SvgIconTypeMap } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"

import { AccountBox, SettingsOutlined, StackedLineChart } from "@mui/icons-material"
import { AppBar, DrawerHeader, DrawerStyles, ListItemStyle, Main, Profile, textWhite } from "layouts/MainScreen/style"
import { Outlet } from "react-router-dom"

interface IListItem {
	title: string
	iconButton: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
		muiName: string
	}
}

const items: IListItem[] = [
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

]

export default function MainScreen() {
	const theme = useTheme()
	/*eslint-disable-next-line*/
	const [open, setOpen] = useState<boolean>(screen.width > 800)

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open} elevation={0}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: "none" }) }}
					>
						<MenuIcon />
					</IconButton>

					<Profile>
						<IconButton>
							<AccountBox color={"secondary"} />
						</IconButton>
					</Profile>

				</Toolbar>
				<Divider />
			</AppBar>
			<Drawer sx={DrawerStyles} variant="persistent" anchor="left" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose} sx={textWhite}>
						{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{items.map((listItem, index) => (
						<ListItem disablePadding sx={ListItemStyle} key={index}>
							<ListItemButton>
								<ListItemIcon sx={{ minWidth: "38px" }}>{createElement(listItem.iconButton)}</ListItemIcon>
								<ListItemText primary={listItem.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />

				<Outlet />
			</Main>
		</Box>
	)
}

import * as React from "react";
import { createElement, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { Divider } from "elements/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import { SettingsOutlined, StackedLineChart } from "@mui/icons-material";
import { DrawerStyles, ListItemStyle, textWhite } from "layouts/MainScreen/style";
import ProfileMenu from "components/ProfileMenu";
import { AppBar, DrawerHeader, Main, MainBox, Profile } from "./emotion";
import { DashboardContext } from "context/DashboardContext";
import { VideoCardProps } from "types/ComponentProps";
import { getPlaylistByIdAction } from "layouts/MainScreen/services";
import { getUser } from "utils";

interface IListItem {
	title: string;
	iconButton: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
		muiName: string;
	};
	path: string;
}

const items: IListItem[] = [
	{
		title: "Dashboard",
		iconButton: DashboardIcon,
		path: "/",
	},
	{
		title: "Statistics",
		iconButton: StackedLineChart,
		path: "/statistics",
	},
	{
		title: "Settings",
		iconButton: SettingsOutlined,
		path: "/settings",
	},
];

export default function MainScreen() {
	const theme = useTheme();
	/*eslint-disable-next-line*/
	const [open, setOpen] = useState<boolean>(screen.width > 800);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const [playlist, setPlaylist] = React.useState<VideoCardProps[]>([]);
	const user = getUser();
	useEffect(() => {
		if (user) {
			getPlaylistByIdAction(user.playlist).then((data) => {
				setPlaylist(data);
			});
		}
	}, [user]);
	const navigate = useNavigate();
	return (
		<MainBox>
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
						<ProfileMenu />
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
						<ListItem
							disablePadding
							sx={ListItemStyle}
							key={index}
							onClick={() => {
								navigate(listItem.path);
							}}
						>
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

				<DashboardContext.Provider value={playlist}>
					<Outlet />
				</DashboardContext.Provider>
			</Main>
		</MainBox>
	);
}

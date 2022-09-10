import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { MenuBoxSxProps, MenuPaperSxProps } from "components/ProfileMenu/style";
import { logOut } from "utils/user";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "routes";
import { IUserContext, UserContext } from "context/UserContext";
import { CircularProgress } from "@mui/material";

export default function ProfileMenu() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const navigate = useNavigate();

	const { user } = useContext(UserContext) as IUserContext;

	return user ? (
		<>
			<Box sx={MenuBoxSxProps}>
				<Tooltip title="Account settings">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? "account-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
					>
						<Avatar
							imgProps={{
								referrerPolicy: "no-referrer",
							}}
							src={user.picture}
						/>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={MenuPaperSxProps}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem>
					<Avatar
						imgProps={{
							referrerPolicy: "no-referrer",
						}}
						src={user.picture}
						alt={user.given_name}
					/>
					{user.given_name}
				</MenuItem>

				<Divider />
				<MenuItem
					onClick={() => {
						navigate(ERoutes.SETTINGS);
					}}
				>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={logOut}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	) : (
		<CircularProgress color={"secondary"} size={35} />
	);
}

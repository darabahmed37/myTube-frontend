import React, { ChangeEvent, FC, FormEvent, useContext, useEffect } from "react";
import {
	Alert,
	Button,
	CircularProgress,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Slide,
	Snackbar,
} from "@mui/material";
import {
	Form,
	Input,
	Item,
	ItemHeader,
	Playlist,
	PlaylistBox,
	SettingItems,
	SettingsContainer,
} from "pages/Settings/emotion";
import { Body1, H1, H3 } from "elements/Typography";
import { IYouTubePlayListItems } from "types/YouTube";
import { changePasswordAction, getAllPlayListsAction, setUserPlaylistAction } from "pages/Settings/service";
import { IUserContext, UserContext } from "context/usercontext";
import { initUser } from "api/profile";

const Settings: FC = () => {
	const [playlists, setPlaylists] = React.useState<IYouTubePlayListItems>();
	const [playlistDisabled, setPlaylistDisabled] = React.useState(true);
	const [selectedPlaylist, setSelectedPlaylist] = React.useState<string | undefined>();
	const [buttonDisabled, setButtonDisabled] = React.useState(true);
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [passwordForm, setPasswordForm] = React.useState<{
		password: string;
		passwordConfirm: string;
	}>({
		password: "",
		passwordConfirm: "",
	});

	function onPasswordChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setPasswordForm({
			...passwordForm,
			[event.target.name]: event.target.value,
		});
	}

	useEffect(() => {
		if (passwordForm.password === passwordForm.passwordConfirm) {
			if (passwordForm.password.length > 6) {
				setButtonDisabled(false);
				return;
			}
		}
		setButtonDisabled(true);
	}, [passwordForm]);

	const { user, setUser } = useContext(UserContext) as IUserContext;

	function handleChange(e: SelectChangeEvent) {
		if (user) {
			setUserPlaylistAction(e.target.value).then(() => {
				setSelectedPlaylist(e.target.value);
				initUser().then((r) => {
					setUser(r.data.user);
				});
			});
		}
	}

	function submitPasswordForm(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		changePasswordAction(passwordForm.password).then(() => {
			setPasswordForm({
				password: "",
				passwordConfirm: "",
			});
			setSnackbarOpen(true);
		});
	}

	useEffect(() => {
		if (user) {
			getAllPlayListsAction().then((data) => {
				setPlaylists(data);
				setSelectedPlaylist(user?.playlist);
				setPlaylistDisabled(false);
			});
		}
	}, [user]);

	function closeSnackbar() {
		setSnackbarOpen(false);
	}

	return (
		<SettingsContainer>
			<H1>Settings</H1>
			<SettingItems>
				<Item>
					<ItemHeader>
						<H3>Your Playlist</H3>
						<Body1>
							<span>Warning!</span> If changed your YouTube playlist you will lose your data
						</Body1>
					</ItemHeader>
					<Playlist>
						<span>Select Playlist</span>
						<PlaylistBox>
							{playlists ? (
								<FormControl fullWidth disabled={playlistDisabled}>
									<InputLabel id="playlist-select-label">Playlist</InputLabel>
									<Select
										labelId="playlist-select-label"
										id="playlist-simple-select"
										value={selectedPlaylist}
										label="Playlist"
										onChange={handleChange}
									>
										{playlists.items.map((list, index) => (
											<MenuItem key={index} value={list.id}>
												{list.snippet.title}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							) : (
								<CircularProgress />
							)}
						</PlaylistBox>
					</Playlist>
				</Item>

				<Item>
					<ItemHeader>
						<H3>Change Password</H3>
					</ItemHeader>
					<Form onSubmit={submitPasswordForm}>
						<FormControl>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input
								id={"password"}
								onChange={onPasswordChange}
								value={passwordForm.password}
								name={"password"}
								type="password"
								autoComplete="current-password"
							/>

							<FormHelperText>Password must be 7 or more figures</FormHelperText>
						</FormControl>
						<FormControl>
							<InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
							<Input
								id={"confirm-password"}
								onChange={onPasswordChange}
								value={passwordForm.passwordConfirm}
								name={"passwordConfirm"}
								type="password"
								autoComplete="current-password"
							/>

							<FormHelperText>Type Same Password here </FormHelperText>
						</FormControl>
						<Button disabled={buttonDisabled} type={"submit"} variant={"contained"}>
							Change
						</Button>
					</Form>
				</Item>
			</SettingItems>
			<Snackbar
				open={snackbarOpen}
				TransitionComponent={Slide}
				onClose={closeSnackbar}
				autoHideDuration={2000}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
			>
				<Alert severity="success" variant="filled">
					Password Changed
				</Alert>
			</Snackbar>
		</SettingsContainer>
	);
};

export default Settings;

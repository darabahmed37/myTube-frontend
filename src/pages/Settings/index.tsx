import React, { FC } from "react"
import { Grid, Typography } from "@mui/material"
import { SettingsContainer, SettingsOption } from "pages/Settings/emotion"

const Settings: FC = () => {
	return (
		<SettingsContainer>
			<Typography variant="h4" component={"h2"} fontSize={"1.7rem"} fontWeight={"700"}>
				Settings
			</Typography>
			<Grid container>
				<Grid item>
					<SettingsOption>
						<Typography variant={"h6"} fontWeight={"600"}>
							Your Playlists
						</Typography>
						<Typography variant={"body1"}>
							<span>Warning:</span> By Changing Playlist you will lose all fo your statistics Data
						</Typography>
					</SettingsOption>
				</Grid>
			</Grid>

		</SettingsContainer>
	)
}

export default Settings

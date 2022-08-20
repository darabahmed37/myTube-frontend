import React, { FC } from "react"
import { SelectChangeEvent } from "@mui/material"
import { Item, ItemHeader, Playlist, SettingItems, SettingsContainer } from "pages/Settings/emotion"
import { Body1, H1, H3 } from "elements/Typography"

const Settings: FC = () => {
	const [age, setAge] = React.useState("")
	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string)
	}
	return (
		<SettingsContainer>
			<H1>Settings</H1>
			<SettingItems>
				<Item>
					<ItemHeader>
						<H3>
							Your Playlist
						</H3>
						<Body1>
							<span>Warning!</span> If changed your YouTube playList you will lose your data
						</Body1>
					</ItemHeader>
					<Playlist>
						<span>Select PlayList</span>
					</Playlist>
				</Item>
			</SettingItems>
		</SettingsContainer>
	)
}

export default Settings

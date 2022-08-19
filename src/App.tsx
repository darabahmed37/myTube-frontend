import React, { FC, useCallback, useEffect } from "react"
import { ThemeProvider } from "@mui/material"
import { theme } from "theme"
import { BrowserRouter, Routes } from "react-router-dom"
import { createRoutes, Routes as RouteList } from "routes"
import { VideoCardProps } from "types/ComponentProps"
import { getPlayLists, getUser } from "utils"

export const PlaylistContext = React.createContext<VideoCardProps[]>([])
const App: FC = () => {
	const [playLists, setPlayLists] = React.useState<VideoCardProps[]>([])

	const user = getUser()

	const initializePlayList = useCallback(async () => {
		if (user?.playlist) {
			getPlayLists(user.playlist).then((data) => {
				setPlayLists(data)
			})
		}
	}, [user?.playlist])

	useEffect(() => {
		initializePlayList().then(() => {
		})
	}, [initializePlayList])
	return (
		<PlaylistContext.Provider value={playLists}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>{createRoutes(RouteList)}</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</PlaylistContext.Provider>
	)
}

export default App

import React, { FC, useEffect } from "react"
import { ThemeProvider } from "@mui/material"
import { theme } from "theme"
import { BrowserRouter, Routes } from "react-router-dom"
import { createRoutes, Routes as RouteList } from "routes"
import { VideoCardProps } from "types/ComponentProps"
import { getPlayLists, getUser } from "utils"

export const playListContext = React.createContext<VideoCardProps[]>([])
const App: FC = () => {
	const [playLists, setPlayLists] = React.useState<VideoCardProps[]>([])

	const user = getUser()
	useEffect(() => {
		getPlayLists(user.playlist).then((data) => {
			setPlayLists(data)
		})
	})
	return (
		<playListContext.Provider value={playLists}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>{createRoutes(RouteList)}</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</playListContext.Provider>
	)
}

export default App

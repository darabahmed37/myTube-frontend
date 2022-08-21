import React, { FC } from "react"
import { ThemeProvider } from "@mui/material"
import { theme } from "theme"
import { BrowserRouter, Routes } from "react-router-dom"
import { createRoutes, Routes as RouteList } from "routes"
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react"

const App: FC = () => {
	return (
		<EmotionThemeProvider theme={theme}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>{createRoutes(RouteList)}</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</EmotionThemeProvider>
	)
}

export default App

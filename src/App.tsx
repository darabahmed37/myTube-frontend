import React, { FC } from "react"
import { ThemeProvider } from "@mui/material"
import { theme } from "theme"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { createRoutes, Routes as RouteList } from "routes"

const App: FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>{createRoutes(RouteList)}</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App

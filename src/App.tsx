import React, { FC } from "react"
import { ThemeProvider } from "@mui/material"
import { theme } from "theme"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Routes as RouteList } from "routes"


const App: FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					{
						RouteList.map(route => {
							if (route.child === undefined)
								return <Route path={route.link} element={route.element} />


						})
					}
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App

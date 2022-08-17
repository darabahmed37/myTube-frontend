import React, { ReactNode } from "react"
import AuthenticateLayout from "layouts/AuthenticateLayout"
import Signin from "pages/Signin"
import Signup from "pages/Signup"
import Dashboard from "pages/Dashboard"
import Redirecting from "pages/Redirecting"
import { Navigate, Route } from "react-router-dom"
import MainScreen from "layouts/MainScreen"
import { PrivateRoutes, PublicRoutes } from "utils/AuthRoutes"
import { uuid } from "utils"
import Player from "pages/Player"

export interface IRoute {
	path: string
	element: ReactNode
	child?: IRoute[]
	index?: boolean
	protected?: boolean
}


export enum ERoutes {
	SIGN_IN = "/auth",
	SIGN_UP = "/auth/sign-up",
	DASHBOARD = "/",
	REDIRECTING = "/redirecting",
}

export const Routes: IRoute[] = [
	{
		path: "auth",
		element: <AuthenticateLayout />,

		child: [
			{
				path: "",
				element: <Signin />,
				index: true,
			},
			{
				path: "sign-up/",
				element: <Signup />,
			},
		],
	},
	{
		path: "/",
		element: <MainScreen />,
		protected: true,
		child: [
			// {
			// 	path: "",
			// 	element: <Dashboard />,
			// 	index: true,
			// },
			{
				path: "",
				element: <Player />,
				index: true,
			},
		],
	},

	{
		path: "/redirecting",
		element: <Redirecting />,
	},
]

export function createRoutes(Routes: IRoute[]) {
	let outputRoutes: ReactNode[] = Routes.map((route) => {
		if (route.child === undefined) {
			return route.protected ? (
				<Route element={<PrivateRoutes />} key={uuid()}>
					<Route {...route} key={uuid()} />
				</Route>
			) : (

				<Route {...route} key={uuid()} />

			)
		}
		return route.protected ? (
			<Route element={<PrivateRoutes />} key={uuid()}>
				<Route path={route.path} key={uuid()} element={route.element}>
					{createRoutes(route.child)}
				</Route>
			</Route>
		) : (
			<Route element={<PublicRoutes />}>
				<Route path={route.path} key={uuid()} element={route.element}>
					{createRoutes(route.child)}
				</Route>
			</Route>
		)
	})
	outputRoutes.push(<Route key={uuid()} path="*" element={<Navigate to={"/"} />} />)
	return outputRoutes
}

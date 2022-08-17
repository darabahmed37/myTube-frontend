import React, { ReactNode } from "react"
import AuthenticateLayout from "layouts/AuthenticateLayout"
import Signin from "pages/Signin/Signin"
import Signup from "pages/Signup/Signup"
import Dashboard from "pages/Dashboard/Dashboard"
import Redirecting from "pages/Redirecting/Redirecting"
import { Navigate, Route } from "react-router-dom"
import MainScreen from "layouts/MainScreen"
import { PrivateRoutes } from "utils/PrivateRoute"

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
			{
				path: "",
				element: <Dashboard />,
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
	let outputRoutes: ReactNode[] = Routes.map((route, index) => {
		if (route.child === undefined) {
			return route.protected ? (
				<Route element={<PrivateRoutes />} key={index}>
					<Route {...route} key={index} />
				</Route>
			) : (
				<Route {...route} key={index} />
			)
		}
		return route.protected ? (
			<Route element={<PrivateRoutes />} key={index}>
				<Route path={route.path} key={index} element={route.element}>
					{createRoutes(route.child)}
				</Route>
			</Route>
		) : (
			<Route path={route.path} key={index} element={route.element}>
				{createRoutes(route.child)}
			</Route>
		)
	})
	outputRoutes.push(<Route key={Math.random() + 100000} path="*" element={<Navigate to={"/"} />} />)
	return outputRoutes
}

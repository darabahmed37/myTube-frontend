import { ReactNode } from "react"
import AuthenticateLayout from "layouts/AuthenticateLayout"
import Signin from "pages/Signin"
import Signup from "pages/Signup"
import Dashboard from "pages/Dashboard"
import Redirecting from "pages/Redirecting"
import { Route } from "react-router-dom"
import MainScreen from "pages/MainScreen"

export interface IRoute {
	path: string
	element: ReactNode
	child?: IRoute[]
	index?: boolean
}

export const Routes: IRoute[] = [
	{
		path: "auth",
		element: <AuthenticateLayout />,

		child: [
			{
				path: "sign-in/",
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
		child: [
			{
				path: "dashboard",
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
	let outputRoutes: ReactNode[] = Routes.map((route) => {
		if (route.child === undefined) {
			return <Route {...route} />
		}
		return (
			<Route path={route.path} element={route.element} >
				{createRoutes(route.child)}
			</Route>
		)
	})
	return outputRoutes
}

export enum ERoutes {
	SIGN_IN = "/auth/sign-in",
	SIGN_UP = "/auth/sign-up",
	DASHBOARD = "/dashboard",
	REDIRECTING = "/redirecting",
}

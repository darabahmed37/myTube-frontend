import { ReactNode } from "react"
import AuthenticateLayout from "layouts/AuthenticateLayout"
import Signin from "pages/Signin"
import Signup from "pages/Signup"
import Dashboard from "pages/Dashboard"
import Redirecting from "pages/Redirecting"
import { Route } from "react-router-dom"
import MainScreen from "pages/MainScreen"

export interface IRoute {
	link: string
	element: ReactNode
	child?: IRoute[]
}

export const Routes: IRoute[] = [
	{
		link: "auth",
		element: <AuthenticateLayout />,
		child: [
			{
				link: "sign-in/",
				element: <Signin />,
			},
			{
				link: "sign-up/",
				element: <Signup />,
			},
		],
	},
	{
		link: "/",
		element: <MainScreen />,
		child: [{
			link: "dashboard",
			element: <Dashboard />,
		}],
	},

	{
		link: "/redirecting",
		element: <Redirecting />,
	},
]

export function createRoutes(Routes: IRoute[]) {
	let outputRoutes: ReactNode[] = Routes.map((route) => {
		if (route.child === undefined) {
			return <Route path={route.link} element={route.element} />
		}
		return <Route path={route.link} element={route.element}>
			{createRoutes(route.child)}
		</Route>
	})
	return outputRoutes
}


export enum ERoutes {
	SIGN_IN = "/auth/sign-in",
	SIGN_UP = "/auth/sign-up",
	DASHBOARD = "/dashboard",
	REDIRECTING = "/redirecting",
}
import { ReactNode } from "react"
import AuthenticateLayout from "layouts/AuthenticateLayout"
import Signin from "pages/Signin"
import Signup from "pages/Signup"
import Dashboard from "pages/Dashboard"
import Redirecting from "pages/Redirecting"
import { Route } from "react-router-dom"

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
		element: <Dashboard />,
	},

	{
		link: "/redirecting",
		element: <Redirecting />,
	},
]

function createRoutes(Routes: IRoute[]) {
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


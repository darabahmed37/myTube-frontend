import React, { ReactNode } from "react";
import AuthenticateLayout from "layouts/AuthenticateLayout";
import Signin from "pages/Auth/Signin";
import Signup from "pages/Auth/Signup";
import Dashboard from "pages/Dashboard";
import Redirecting from "pages/Redirecting";
import { Navigate, Route } from "react-router-dom";
import MainScreen from "layouts/MainScreen";
import { PrivateRoutes, PublicRoutes } from "routes/AuthRoutes";
import PlayerScreen from "pages/PlayerScreen";
import Settings from "pages/Settings";
import Statistics from "pages/Statistics";

export interface IRoute {
	path: string;
	element: ReactNode;
	child?: IRoute[];
	index?: boolean;
	protected?: boolean;
}

export enum ERoutes {
	SIGN_IN = "/auth",
	SIGN_UP = "/auth/sign-up",
	DASHBOARD = "/",
	REDIRECTING = "/redirecting",
	SETTINGS = "/settings",
	STATISTICS = "/statistics",
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
			{
				path: ":videoId",
				element: <PlayerScreen />,
			},
			{
				path: "settings",
				element: <Settings />,
			},
			{
				path: "statistics",
				element: <Statistics />,
			},
		],
	},

	{
		path: "/redirecting",
		element: <Redirecting />,
	},
];

export function createRoutes(Routes: IRoute[]) {
	let outputRoutes: ReactNode[] = Routes.map((route, index) => {
		if (route.child === undefined) {
			return route.protected ? (
				<Route element={<PrivateRoutes />} key={index}>
					<Route {...route} key={index} />
				</Route>
			) : (
				<Route {...route} key={index} />
			);
		}
		return route.protected ? (
			<Route element={<PrivateRoutes />} key={index}>
				<Route path={route.path} key={index} element={route.element}>
					{createRoutes(route.child)}
				</Route>
			</Route>
		) : (
			<Route element={<PublicRoutes />} key={index}>
				<Route path={route.path} key={index} element={route.element}>
					{createRoutes(route.child)}
				</Route>
			</Route>
		);
	});
	outputRoutes.push(<Route key={3000} path="*" element={<Navigate to={"/"} />} />);
	return outputRoutes;
}

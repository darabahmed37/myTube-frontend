import { Navigate, Outlet } from "react-router-dom"
import { ERoutes } from "routes"

export const PrivateRoutes = () => {
	let auth = localStorage.getItem("access")
	return auth ? <Outlet /> : <Navigate to={ERoutes.SIGN_IN} />
}

export const PublicRoutes = () => {
	let auth = localStorage.getItem("access")
	return auth ? <Navigate to={ERoutes.DASHBOARD} /> : <Outlet />
}

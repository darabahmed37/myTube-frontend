import { Navigate, Outlet } from "react-router-dom"
import { ERoutes } from "routes/index"

export const PrivateRoutes = () => {
	let auth = localStorage.getItem("access")
	return auth ? <Outlet /> : <Navigate to={ERoutes.SIGN_IN} />
}

export function PublicRoutes() {
	let auth = localStorage.getItem("access")

	const outlet = <Outlet />
	const navigate = <Navigate to={ERoutes.DASHBOARD} />
	return auth ? navigate : outlet
}

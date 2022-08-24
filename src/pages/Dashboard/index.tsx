import React, { FC, useContext } from "react"
import VideoGrid from "components/VideoGrid"
import { DashboardContext } from "context/DashboardContext"

const Dashboard: FC = () => {
	const playlist = useContext(DashboardContext)
	return (
		<>

			<VideoGrid playlist={playlist} />
		</>
	)
}

export default Dashboard

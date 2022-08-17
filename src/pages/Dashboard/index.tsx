import React, { FC, useEffect } from "react"
import { VideoCardProps } from "types/ComponentProps"
import VideoGrid from "components/VideoGrid"
import { getPlayLists, getUser } from "utils"
import { User } from "types/IAuth"

const Dashboard: FC = () => {
	const [playlists, setPlaylists] = React.useState<VideoCardProps[]>([])
	const user: User = getUser()

	useEffect(() => {
		getPlayLists(user.playlist).then((data) => {
			setPlaylists(data)
		})
	}, [])
	return (
		<>
			<VideoGrid videos={playlists} />
		</>
	)
}

export default Dashboard

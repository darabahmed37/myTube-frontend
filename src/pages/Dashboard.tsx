import React, {FC} from 'react';
import VideoGrid from "../layouts/VideoGrid";

const Dashboard: FC = () => {
	return (
		<>
			<VideoGrid
				videos={[
					{
						title: "Brown Woodboard",
						description: "This is Description",
						imageUrl:
							"https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
					},
				]}
			/>
		</>
	);
};

export default Dashboard;
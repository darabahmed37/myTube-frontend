import React, { FC } from "react"
import { Outlet } from "react-router-dom"
import { HomeContainer, HomeMain, Left, Right } from "layouts/AuthenticateLayout/styles"

const AuthenticateLayout: FC = () => {


	return (
		<HomeMain>
			<HomeContainer>
				<Left item container lg={6}>
					<div>
						<h2>My Tube</h2>
					</div>
					<Outlet />
				</Left>
				<Right lg={6} item container></Right>
			</HomeContainer>
		</HomeMain>
	)
}
export default AuthenticateLayout

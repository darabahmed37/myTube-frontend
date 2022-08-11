import { Grid, styled } from "@mui/material"
import background from "assets/beautiful-african-american-woman-wearing-earphones-city-remixed-media.jpg"

export const HomeMain = styled("div")(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "100vh",
	backgroundColor: theme.palette.secondary.main,
}))

export const HomeContainer = styled(Grid)(({ theme }) => ({
	overflow: "hidden",

	[theme.breakpoints.up("lg")]: {
		maxWidth: "850px",
		height: "800px",
		maxHeight: "90vh",
	},
	[theme.breakpoints.down("lg")]: {
		width: "70vw",
		height: "90vh",
	},
	[theme.breakpoints.down("md")]: {
		width: "65vw",
		height: "85vh",
	},
	[theme.breakpoints.down("sm")]: {
		width: "100vw",
		height: "100vh",
	},
}))
HomeContainer.defaultProps = {
	container: true,
}

export const Left = styled(Grid)(({ theme }) => ({
	[theme.breakpoints.down("lg")]: {
		flex: "1",
	},
	background: "white",
	flex: 0.5,
	display: "flex",
	flexDirection: "column",
	gap: "2em",
	justifyContent: "center",
	alignItems: "center",
	padding: "3rem",
}))

export const Right = styled(Grid)(({ theme }) => ({
	[theme.breakpoints.down("lg")]: {
		display: "none",
	},

	position: "relative",
	flex: 0.5,
	padding: "3rem",
	backgroundColor: "#8EF1FF80",
	"&::before": {
		content: `""`,
		transform: "translateX(-3rem)",
		top: "0",
		bottom: "0",
		position: "absolute",
		opacity: 0.5,
		width: "100%",
		overflow: "hidden",
		background: `url(${background}) -126% `,
		backgroundSize: "cover",
	},
}))

export const InputForm = styled("form")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: "2em",
	width: "80%",
}))

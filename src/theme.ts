import { createTheme } from "@mui/material";

export const theme = createTheme({
	typography: {
		fontFamily: "Inter, Arial, Helvetica, sans-serif",
		fontSize: 13,
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				fontFamily: "Inter, Arial, Helvetica, sans-serif",
			},
		},
		MuiLinearProgress: {
			styleOverrides: {
				root: {
					width: "100%",
				},
			},
			defaultProps: {
				color: "secondary",
			},
		},
	},

	palette: {
		primary: {
			main: "#3C9BF9",
			contrastText: "#fff",
		},
		secondary: {
			main: "#383838",
			contrastText: "#fff",
		},
	},
});

import {Grid, styled} from "@mui/material";
import background from "../assets/beautiful-african-american-woman-wearing-earphones-city-remixed-media.jpg";

export const HomeMain = styled("div")(({theme}) => ({
    background: "#1e1e1e",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("lg")]: {
        minWidth: "1200px",
    },
}));

export const HomeContainer = styled(Grid)(({theme}) => ({
    [theme.breakpoints.down("lg")]: {
        justifyContent: "center",
        width: `${theme.breakpoints.values.md}px`
    }
    ,
    [theme.breakpoints.down("md")]: {
        width: "100%",
    }
}));
HomeContainer.defaultProps = {
    container: true,
    maxWidth: {xl: "1920px", lg: "1280px", md: "100%"},
    minHeight: {lg: "900px", md: "100%"},
    width: {lg: "60vw"},
    height: "90vh",

};

export const Left = styled(Grid)(({theme}) => ({
    background: "white",
    flex: 0.5,
    display: "flex",
    flexDirection: "column",
    gap: "2em",
    justifyContent: "center",
    alignItems: "center",
    padding: "3rem",
}));

export const Right = styled(Grid)(({theme}) => ({
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
        background: `url(${background}) -126%`,
        backgroundSize: "cover",
    },
}));

export const InputForm = styled("form")(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    gap: "2em",
    width: "80%",
}));

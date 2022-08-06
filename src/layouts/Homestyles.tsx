import {styled} from "@mui/material";
import background from "../assets/beautiful-african-american-woman-wearing-earphones-city-remixed-media.jpg";

export const HomeMain = styled("div")(({theme}) => ({
  background: "#1e1e1e",
  height: "100vh",
  display: "flex",
  minWidth: "1280px",
  alignItems: "center",
}))

export const HomeContainer = styled("div")(({theme}) => ({
  display: "flex;",
  margin: "0 auto",
  width: "60%",
  maxWidth: "80%",
  minHeight: "768px",
}))

export const Left = styled("div")(({theme}) => ({
  background: "white",
  flex: 0.5,
  display: "flex",
  flexDirection: "column",
  gap: "2em",
  justifyContent: "center",
  alignItems: "center",
  padding: "3rem"
}))

export const Right = styled("div")(({theme}) => ({
  position: "relative",
  flex: 0.5,
  padding: "3rem",
  backgroundColor: "#8EF1FF80",
  "&::before": {
    content: '',
    transform: "translateX(-3rem)",
    top: "0",
    bottom: "0",
    position: "absolute",
    opacity: 0.5,
    width: "100%",
    overflow: "hidden",
    background: `url(${background})`
    ,
    backgroundSize: "cover"
  }
}))


export const InputForm = styled("form")(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2em",
  width: "80%"
}))

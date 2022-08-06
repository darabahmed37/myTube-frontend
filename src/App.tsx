import React, {FC} from "react";
import Home from "./layouts/Home";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import {BrowserRouter} from "react-router-dom";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Home title={"Create An Account"} buttonText={"Get Started"} googleTitle={"Signup  with Google"} navigation={{
          title: "Already Have An Account",
          linkText: "Signup",
          link: ""
        }}/>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

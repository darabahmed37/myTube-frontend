import React, {ChangeEvent, FC} from "react";
import "./home.scss";
import GoogleButton from "react-google-button";
import {Link as MuiLink, TextField} from "@mui/material";
import {RoundedButton} from "../elements/button";
import {Link} from "react-router-dom";

export interface IHome {
  title: string;
  googleTitle: string;
  buttonText: string;
  navigation: {
    title: string;
    linkText: string;
    link: string;
  };
}

interface ICredentials {
  email: string;
  password: string;
}

interface IValidation {
  helperText: string;
  error: boolean;
}

const Home: FC<IHome> = ({title, googleTitle, buttonText, navigation}) => {
  const [credentialsForm, setCredentialsForm] = React.useState<ICredentials>({
    email: "",
    password: "",
  });
  const [emailValidation, setEmailValidation] = React.useState<IValidation>({
    helperText: "",
    error: false,
  });
  const [passwordValidation, setPasswordValidation] =
    React.useState<IValidation>({
      helperText: "",
      error: false,
    });

  function isValidEmail(email: string): boolean {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
  }

  function validation(): void {
    if (
      isValidEmail(credentialsForm.email) ||
      credentialsForm.email.length === 0
    ) {
      setEmailValidation(() => ({
        error: false,
        helperText: "",
      }));
    } else {
      setEmailValidation(() => ({
        error: true,
        helperText: "Please enter a valid email",
      }));
    }
    if (
      credentialsForm.password.length > 6 ||
      credentialsForm.password.length === 0
    ) {
      setPasswordValidation(() => ({
        error: false,
        helperText: "",
      }));
    } else {
      setPasswordValidation(() => ({
        error: true,
        helperText: "Password must be at least 6 characters",
      }));
    }
  }

  const formSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    validation();
  };

  function onStateChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setCredentialsForm({
      ...credentialsForm,
      [event.target.name]: event.target.value,
    });
  }

  React.useEffect(() => {
    validation();
  }, [credentialsForm]);

  return (
    <>
      <div className="home">
        <div className="home-container">
          <div className="left">
            <div className="left-items">
              <h2>My Tube</h2>
            </div>
            <div className="left-items">
              <span className={"light-text"}>{title}</span>
            </div>
            <div className="left-items">
              <GoogleButton label={googleTitle} type={"light"}/>
            </div>
            <div className="left-items">
              <p className={"light-text"}>OR</p>
            </div>
            <form className="left-items input-container" onSubmit={formSubmit}>
              <TextField
                fullWidth
                error={emailValidation.error}
                size={"small"}
                helperText={emailValidation.helperText}
                variant={"standard"}
                name={"email"}
                label={"Email"}
                value={credentialsForm.email}
                onChange={onStateChange}
              />
              <TextField
                error={passwordValidation.error}
                helperText={passwordValidation.helperText}
                name={"password"}
                size={"small"}
                variant={"standard"}
                type={"password"}
                value={credentialsForm.password}
                onChange={onStateChange}
                label="Password"
              />

              <RoundedButton
                sx={{
                  margin: "0 auto",
                }}
                type={"submit"}
              >
                {buttonText}
              </RoundedButton>
            </form>

            <div
              className="left-items"
              style={{
                fontSize: ".8rem",
                transform: "translateY(4rem)",
              }}
            >
              {navigation.title+" "}

              <MuiLink
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline"
                  }
                }}
                component={Link}
                to={navigation.link}
              >
                { navigation.linkText}
              </MuiLink>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
    </>
  );
};
export default Home;

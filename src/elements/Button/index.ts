import { Button, ButtonProps, styled } from "@mui/material";

export const RoundedButton = styled(Button)<ButtonProps>((theme) => ({
	borderRadius: "5em",
	padding: ".75rem 1.7rem",
	fontSize: ".75rem",
	margin: "0 auto",
}));

RoundedButton.defaultProps = {
	variant: "contained",
	size: "large",
};

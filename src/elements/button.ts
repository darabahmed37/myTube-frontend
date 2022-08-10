import { styled } from "@mui/material"
import { Button, ButtonProps } from "@mui/material"

export const RoundedButton = styled(Button)<ButtonProps>((theme) => ({
	borderRadius: "5em",
	padding: ".75rem 1.7rem",
	fontSize: ".75rem",
}))

RoundedButton.defaultProps = {
	variant: "contained",
	size: "large",
}

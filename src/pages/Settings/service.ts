import { changePassword } from "api/auth"

export async function changePasswordAction(password: string): Promise<string> {
	return (await changePassword(password)).data.message
}

export interface ICredentials {
	email: string;
	password: string;
}

export interface IValidation {
	helperText: string;
	error: boolean;
}

export interface User {
	id: string;
	email: string;
	picture: string;
	given_name: string;
	family_name: string;
	playlist: string;
}

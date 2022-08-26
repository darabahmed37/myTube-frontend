import React, { createContext } from "react";
import { User } from "types/IAuth";

export interface IUserContext {
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	user: User | null;
}

export const UserContext = createContext<IUserContext | null>(null);

import { ICartProduct, IUser } from "@/interfaces";
import { createContext } from "react";

interface ContextPros {
    isLoggedIn: boolean;
    user?: IUser;

    //Methods
    loginUser: (email: string, password: string) => Promise<boolean>
    registerUser: (email: string, password: string, name: string) => Promise<boolean>
}

export const AuthContext = createContext({} as ContextPros);
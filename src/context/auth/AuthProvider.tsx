import { IUser } from "@/interfaces";
import { FC, useReducer, useEffect } from 'react';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';
import { toast } from "react-toastify";
import { tesloApi } from "@/api";
import Cookies from "js-cookie";
import async from '../../pages/api/seed';
import { Router, useRouter } from 'next/router';


export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter();

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        if(!Cookies.get('token')){
            return;
        }
        try {
            const data = await tesloApi({ url: '/user/validate-token' });
            const { message, token, user } = await data.json();
            console.log({ message, token, user });

            if (message) {
                router.push('/auth/login')
                Cookies.remove('token')
                return;
            }
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user })

        } catch (error) {
            Cookies.remove('token')
            router.push('/auth/login')
        }
    }

    //Methods
    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const data = await tesloApi({
                url: '/user/login',
                data: { email, password },
                method: 'POST'
            });
            const { message, token, user } = await data.json();
            console.log({ message, token, user });
            if (message) {
                toast(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "light",
                    type: 'error'
                })
                return false;
            }
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user })
            return true;
        } catch (error) {
            console.log('Error: ', error)
            return false
        }
    }

    const registerUser = async (email: string, password: string, name: string): Promise<boolean> => {
        try {
            const data = await tesloApi({
                url: '/user/register',
                data: { email, password, name },
                method: 'POST'
            });
            const { message, token, user } = await data.json();
            console.log({ message, token, user });
            if (message) {
                toast(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "light",
                    type: 'error'
                })
                return false;
            }
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user })
            return true;
        } catch (error) {
            console.log('Error: ', error)
            return false
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            //Methods
            loginUser,
            registerUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}


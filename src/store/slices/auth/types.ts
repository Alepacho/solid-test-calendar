import { IUser } from "../../../models/IUser";

export interface AuthState {
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string;
    setIsAuth: (flag: boolean) => void;
    setError: (message: string) => void;
    setIsLoading: (flag: boolean) => void;
    setUser: (user: IUser) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
}
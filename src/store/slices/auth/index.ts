import { StateCreator } from 'zustand';
import { IUser } from '../../../models/IUser';
import { AuthState } from './types';
import axios from "axios";

export const createAuthSlice: StateCreator<AuthState> = (set, get, api) => ({
    isAuth: false,
    isLoading: false,
    user: {} as IUser,
    error: '',
    setIsAuth: (flag: boolean) => set(() => ({ isAuth: flag, isLoading: false })),
    setError: (message: string) => set(() => ({ error: message, isLoading: false })),
    setIsLoading: (flag: boolean) => set(() => ({ isLoading: flag })),
    setUser: (user: IUser) => set(() => ({ user: user })),
    login: async (username: string, password: string) => {
        const state = api.getState();
        try {
            state.setError('');
            state.setIsLoading(true);
            setTimeout(async () => {
                const response = await axios.get<IUser[]>("/users.json").catch(err => {throw(err)});
                const mockUser = response.data.find(u => (u.username === username && u.password === password));
                if (!mockUser) {
                    state.setError("Такого пользователя не существует!");
                } else {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUser.username);
                    state.setUser(mockUser);
                    state.setIsAuth(true);
                    state.setIsLoading(false);
                }
            }, 1000);
        } catch(e) {
            console.log("ERROR:", e);
            state.setError("Произошла ошибка при логине.");
        }
    },
    logout: async () => {
        const state = api.getState();
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        state.setIsAuth(false);
        state.setUser({} as IUser);
    },
})
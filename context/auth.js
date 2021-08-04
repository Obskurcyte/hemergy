import {createContext} from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    username: null,
    email: null,
    token: null
});
import {createContext} from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    username: null,
    token: null
});
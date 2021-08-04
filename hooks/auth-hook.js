import {useCallback, useEffect, useState} from "react";
let logoutTimer;
export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [username, setUsername] = useState(false);
    const [email, setEmail] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();


    const login = useCallback((username, token, email, expirationDate) => {
        setUsername(username)
        setToken(token)
        setEmail(email)
        const tokenExpiratonDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365)
        setTokenExpirationDate(tokenExpiratonDate);
        localStorage.setItem('userDataHemergy',
            JSON.stringify({
                name: username,
                token: token,
                email: email,
                expiration: tokenExpiratonDate.toISOString()
            }))
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUsername(null)
        localStorage.removeItem('userDataHemergy')
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userDataHemergy'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.name, storedData.token, storedData.email, new Date(storedData.expiration))
        }
    }, [login]);

    return {token, login, logout, email, username}
}
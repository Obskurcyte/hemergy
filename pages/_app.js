import React, {useState, useCallback, useEffect} from 'react';
import '../styles/globals.css';
import '../styles/index.css';
import '../styles/footer.css';
import '../styles/login.css';
import '../styles/postProject.css';
import '../styles/projects.css';
import '../styles/projectCard.css';
import '../styles/projectDetail.css';
import '../styles/checkout.css';
import '../styles/wallet.css';
import '../styles/started.css';
import '../styles/profile.css';
import '../styles/contact.css';

import '../i18n';
import Head from 'next/head';
import {AuthContext} from "../context/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from "redux";
import authReducer from "../store/reducers/auth";

function MyApp({ Component, pageProps }) {

    const [token, setToken] = useState(false);
    const [username, setUsername] = useState(false);

    const rootReducer = combineReducers({
        auth: authReducer,
    })

    const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

    const login = useCallback((username, token, expirationDate) => {
        setUsername(username)
        setToken(token)
        const tokenExpiratonDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365)
        localStorage.setItem('userDataHemergy',
            JSON.stringify({
            name: username,
            token: token,
            expiration: tokenExpiratonDate.toISOString()
        }))
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUsername(null)
        localStorage.removeItem('userDataHemergy')
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userDataHemergy'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.name, storedData.token, new Date(storedData.expiration))
        }
    }, [login]);

  return (

      <Provider store={store}>
      <React.Fragment>
        <Head>
          <title>Hemergy</title>
          <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin/>

          <script
    src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
    crossOrigin/>

          <script
    src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
    crossOrigin/>
        </Head>
          <AuthContext.Provider value={{
              isLoggedIn: !!token,
              token: token,
              username: username,
              login: login,
              logout: logout,

          }}>
                <Component {...pageProps} />
          </AuthContext.Provider>
      </React.Fragment>
      </Provider>
  )
}

export default MyApp

import React, {useEffect} from 'react';
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
import '../styles/email-confirmation.css';
import '../i18n';
import Head from 'next/head';
import {AuthContext} from "../context/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from "redux";
import authReducer from "../store/reducers/auth";
import {useAuth} from '../hooks/auth-hook'
import { useRouter } from 'next/router'
import * as ga from '../lib/ga'

function MyApp({ Component, pageProps }) {

    const rootReducer = combineReducers({
        auth: authReducer,
    })

    const {token, login, logout, email, username} = useAuth()
    const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url) => {
            ga.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

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
              email: email,
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

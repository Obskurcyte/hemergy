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
import '../i18n';
import Head from 'next/head';
import {AuthContext} from "../context/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from "redux";
import authReducer from "../store/reducers/auth";
import {useAuth} from '../hooks/auth-hook'


function MyApp({ Component, pageProps }) {

    const rootReducer = combineReducers({
        auth: authReducer,
    })

    const {token, login, logout, email, username} = useAuth()
    const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

    useEffect(() => {
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:2505739,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    })

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

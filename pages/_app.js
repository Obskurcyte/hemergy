import React from 'react';
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
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
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
        <Component {...pageProps} />
      </React.Fragment>
  )
}

export default MyApp

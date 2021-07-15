import React from 'react';
import Head from "next/head";
import styles from '../styles/Home.module.css'
import PurpleButton from "../components/PurpleButton";
import WhiteButton from "../components/WhiteButton";
import Header from "../components/Header";
import ReactPlayer from 'react-player'
import Footer from "../components/Footer";
import {useSession} from "next-auth/client";
import {useTranslation} from "react-i18next";

export default function Home() {

    const { t, i18n } = useTranslation();

  return (
    <div>
      <Head>
        <title>Hemergy - Index</title>
      </Head>


      <Header />
      <div className="headTitle">
        <h1 className='mainTitle'>{t('Index1')}</h1>
        <h3>{t('Index2')}</h3>
        <div className="buttonContainer">
          <PurpleButton title={t('Index3')} id="learnMore"/>
          <WhiteButton title={t('Index4')} id="indexAvailable"/>
        </div>
      </div>

        <img src={'/imageAccueil.svg'} alt="" className="imgAccueil"/>

        <div className="howItWorks">
            <h5>{t('Index5')}</h5>
            <h4>{t('Index6')}</h4>
            <p>{t('Index7')}</p>
        </div>

        <div className="video">
            <ReactPlayer
                url="https://play.maxandlea.com/wp-content/uploads/2020/09/Video2-MAXLEA-FR-SHORT-SHORT-V4-600.mp4"
                className="video-presentation"
                playing
                height="100%"
                width="100%"
                loop
                playIcon={<img src={'/PhotoVideo2.png'} alt=""/>}
                light="/overlayVideo.webp"
            />
        </div>

        <div className="contributorsContainer">
            <div className="contributorInner">
                <div>
                    <div className="contributorMini">
                        <h5>{t('Index8')}</h5>
                        <h4>{t('Index9')}</h4>
                        <p>{t('Index10')}
                            <br/>{t('Index11')}</p>
                    </div>
                    <PurpleButton title={t('Index42')}/>
                </div>
                <img src={"/photoEolienne.png"} alt=""/>
            </div>

            <div className="contributorInner2">
                <img src={"/panneauSolaire.png"} alt="" className='imgEolienne'/>
                <div className="innerEolienneContainer">
                    <div className="contributorMini2">
                        <h5>{t('Index12')}</h5>
                        <h4>{t('Index13')}</h4>
                        <p>{t('Index14')}
                            <br/>{t('Index15')}</p>
                    </div>
                    <PurpleButton title={t('Index42')}/>
                </div>
            </div>
        </div>

        <div className="ecosystemContainer">
            <h5>{t('Index16')}</h5>
            <h4>{t('Index17')}</h4>
            <div className="ecosystemInner">
                <div className="ecosystemMini">
                    <h3>{t('Index18')}</h3>
                    <p>{t('Index19')}
                        <br/>{t('Index20')}</p>
                </div>
                <img src={"/powerPlant.png"} alt=""/>
            </div>

            <div className="ecosystemInner2">
                <img src={"/powerBlockchain.png"} alt=""/>
                <div className="ecosystemMini2">
                    <h3>{t('Index21')}</h3>
                    <p>{t('Index22')}
                        <br/>{t('Index23')}</p>
                </div>
            </div>
            <PurpleButton title={t('Index43')} id="apiButton"/>
        </div>


        <div className="ecosystemContainer aboutContainer">
            <h5>{t('Index24')}</h5>
            <h4>{t('Index25')}</h4>
            <div className="ecosystemInner">
                <div className="ecosystemMini">
                    <h3>{t('Index26')}</h3>
                    <p>{t('Index27')}
                        <br/>{t('Index28')}
                    </p>
                </div>
                <img src={"/energyAsset.png"} alt=""/>
            </div>

            <div className="ecosystemInner2">
                <img src={"/eolienne.png"} alt=""/>
                <div className="ecosystemMini2">
                    <h3>{t('Index29')}</h3>
                    <p>{t('Index30')}
                    <br/>{t('Index31')}</p>
                </div>
            </div>
            <PurpleButton title={t('Index44')} id="apiButton"/>
        </div>

        <div className="reasonContainer">
            <h5>{t('Index32')}</h5>
            <h4>{t('Index33')}</h4>
            <div className="flexContainer">
                <div className="whyContainer">
                    <img src={'/why.png'} alt="" className='whatImage'/>
                    <h4>{t('Index34')}</h4>
                    <p>{t('Index35')}</p>
                </div>
                <div className="whyContainer">
                    <img src={'/how.png'} alt="" className='whyImage'/>
                    <h4>{t('Index36')}</h4>
                    <p>{t('Index37')}</p>
                </div>
                <div className="whyContainer">
                    <img src={'/what.png'} alt="" className='whyImage'/>
                    <h4>{t('Index38')}</h4>
                    <p>{t('Index39')}</p>
                </div>
            </div>
        </div>

        <div className="contactContainer">
            <h4>{t('Index40')}</h4>
            <p>{t('Index41')}</p>
            <div className="inputFlex">
                <div className="nameInput contactInput">
                    <img src={'/profile.png'} alt="" />
                    <input type="text" placeholder={t('Index45')}/>
                </div>
                <div className="emailInput contactInput">
                    <img src={'/Message.png'} alt="" />
                    <input type="email" placeholder={t('Index46')}/>
                </div>
            </div>
            <div className="bigInput">
                <div className="placeholderContainer">
                    <img src={'/Edit.png'} alt=""/>
                    <textarea placeholder={t('Index47')}/>
                </div>
            </div>
            <PurpleButton title={t('Index48')} id="sendMessage"/>
        </div>

        <Footer />

    </div>
  )
}

import React from 'react';
import PurpleButton from "../components/PurpleButton";
import {useTranslation} from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Ecosystem = () => {


    const { t, i18n } = useTranslation();

    return (

        <>
            <Header />
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

            <Footer />
            </>
    );
};

export default Ecosystem;
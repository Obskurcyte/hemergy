import React from 'react';
import Link from "next/link";
import {useTranslation} from "react-i18next";

const Footer = () => {

    const { t, i18n } = useTranslation();


    return (
        <footer className="footerContainer">
            <div className="footerInnerContainer">
            <img src={'/logoWhite.png'} alt="" className="imgFooter"/>
            <div className="innerFooter">
                <div className="colFooter">
                    <Link href="#"><p>{t('Footer1')}</p></Link>
                    <Link href="/privacy-policy"><p>{t('Footer2')}</p></Link>

                </div>
                <div className="colFooter">
                    <Link href="#"><p>{t('Footer3')}</p></Link>
                    <Link href="#"><p id="conditionsOfSales">{t('Footer4')}</p></Link>
                </div>
                <div className="colFooter">
                    <Link href="#"><p>{t('Footer5')}</p></Link>
                    <div style={{display: 'flex'}}>
                        <img src={'/mailFooter.png'} alt="" className="emailFooter"/>
                        <p id="emailHemergy">info@hemergy.com</p>
                    </div>
                </div>
            </div>
                <div className="colFooter">
                    <p>{t('Footer6')}</p>
                        <div style={{display: 'flex', justifyContent: 'space-around'}} className="followContainer">
                            <img src={'/facebook.png'} alt=""/>
                            <img src={'/linkedin.png'} alt=""/>
                            <img src={'/twitter.png'} alt=""/>
                            <img src={'/instagram.png'} alt=""/>
                            <img src={'/youtube.png'} alt=""/>
                        </div>
                    </div>
            </div>

            <hr/>
            <p className="copyright">Copyright @2021 Hemergy</p>

        </footer>
    );
};

export default Footer;
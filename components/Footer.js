import React from 'react';
import Link from "next/link";

const Footer = () => {

    return (
        <footer className="footerContainer">
            <div className="footerInnerContainer">
            <img src={'/logoWhite.png'} alt="" className="imgFooter"/>
                <div className="colFooter">
                    <Link href="#"><p>FAQ</p></Link>
                    <Link href="#"><p>Privacy Policy</p></Link>

                </div>
                <div className="colFooter">
                    <Link href="#"><p>General Terms</p></Link>
                    <Link href="#"><p>Conditions of Sale</p></Link>
                </div>
                <div className="colFooter">
                    <Link href="#"><p>Contact Us</p></Link>
                    <div style={{display: 'flex'}}>
                        <img src={'/mailFooter.png'} alt="" className="emailFooter"/>
                        <p>info@hemergy.com</p>
                    </div>
                </div>
                <div className="colFooter">
                    <p>Follow us</p>
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
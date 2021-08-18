import React, {useContext, useEffect, useState} from 'react';
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import styles from './Header.module.css';
import Link from "next/link";
import {useRouter} from "next/router";
import {useSession} from "next-auth/client";
import {signIn} from "next-auth/client";
import {AuthContext} from "../context/auth";
import Avatar from '@material-ui/core/Avatar';
import i18next from "i18next";
import { useTranslation } from 'react-i18next';
import {Link as ScrollLink} from 'react-scroll';

const Header = (props) => {

    const { t, i18n } = useTranslation();
    const lang = i18next.language;

    const handleClose = async (lang) => {
       await i18n.changeLanguage(lang)
    };

    const auth = useContext(AuthContext);
    const router = useRouter()
    const logout = async () => {
        localStorage.removeItem('userDataHemergy')
        await router.push('/')
        window.location.reload()
    }

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userDataHemergy'));
        console.log(storedData)
        setUserData(storedData)
    }, []);

    let username;
    let googleName;
    let initial;
    if (userData) {
        username = userData.name
        if (username) {
            initial = username.charAt(0).toUpperCase()
        }
        if(userData.result) {
            googleName = userData.result.givenName
            initial = googleName.charAt(0).toUpperCase()

        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" className='logoContainer'><img src={'/logo.png'} alt=""/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto expandNav">



                        <Nav.Link href="/projects" className={styles.navLinks} id={styles.nav2}>{t("NavBar2")}</Nav.Link>
                        <Nav.Link href="/postProject" className={styles.navLinks} id={styles.nav3}>{t("NavBar3")}</Nav.Link>
                        <Nav.Link href="/ecosystem" className={styles.navLinks} id={styles.nav4}>{t("NavBar4")}</Nav.Link>

                        {props.accueil ?
                            <ScrollLink activeClass="active" to="aboutUs" spy={true} smooth={true} className='Header_navLinks__Wqkkq nav-link' style={{cursor: 'pointer'}}>{t("NavBar1")}</ScrollLink>
                            : ''}

                        {props.accueil ?
                            <ScrollLink activeClass="active" to="contact" spy={true} smooth={true} className='Header_navLinks__Wqkkq nav-link' style={{cursor: 'pointer'}}>
                                {t("NavBar5")}
                            </ScrollLink> : ''
                        }

                        <NavDropdown title={lang.toUpperCase()} id="basic-nav-dropdown" className={styles.navLinks}>
                            <NavDropdown.Item href="javascript:void(0)" onClick={() => handleClose('fr')}>FR</NavDropdown.Item>
                            <NavDropdown.Item href="javascript:void(0)" onClick={() => handleClose('es')}>ESP</NavDropdown.Item>
                            <NavDropdown.Item href="javascript:void(0)" onClick={() => handleClose('en')}>EN</NavDropdown.Item>
                        </NavDropdown>
                        {
                            userData && (
                                <Nav.Link className='join flex justify-content-between profile-link'>
                                    <div className="flex justify-content-around profile-header-container">
                                        <Avatar>{initial}</Avatar>

                                        <NavDropdown title="" id="basic-nav-dropdown" className={styles.navLinks}>
                                            <NavDropdown.Item href={'/wallet'} onClick={async () => {
                                                await router.push('/wallet')
                                            }}>Check my wallet</NavDropdown.Item>
                                            <NavDropdown.Item href={"/profile"}  onClick={async () => {
                                                await router.push('/profile')
                                            }}>Modify my infos</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3" onClick={logout}>Disconnect</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                        </NavDropdown>
                                    </div>
                                </Nav.Link>
                            )
                        }
                        {!userData && (
                            <Nav.Link className='ml-auto join'>
                                <div className={styles.buttonContainer}>
                                    <Link href={'/login'}><p className={styles.buttonText}>{t("NavBar6")}</p></Link>
                                </div>
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
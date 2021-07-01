import React from 'react';
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import styles from './Header.module.css';
import Link from "next/link";
import {useSession} from "next-auth/client";

const Header = () => {

    const [session, loading] = useSession();

    console.log(session)
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" className='logoContainer'><img src={'/logo.png'} alt=""/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto expandNav">
                        <Nav.Link href="#home" className={styles.navLinks}>About us</Nav.Link>
                        <Nav.Link href="projects" className={styles.navLinks}>Contribute</Nav.Link>
                        <Nav.Link href="postProject" className={styles.navLinks}>Post a project</Nav.Link>
                        <Nav.Link href="#link" className={styles.navLinks}>Ecosystem</Nav.Link>
                        <Nav.Link href="#link" className={styles.navLinks}>Contact</Nav.Link>
                        <NavDropdown title="EN" id="basic-nav-dropdown" className={styles.navLinks}>
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        {!session && !loading && (
                            <Nav.Link className='ml-auto join'>
                                <div className={styles.buttonContainer}>
                                    <Link href={'/login'}><p className={styles.buttonText}>Join Us</p></Link>
                                </div>
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
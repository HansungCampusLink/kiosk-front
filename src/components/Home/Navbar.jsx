
import React, { useState } from "react"; // React 임포트
import {Navbar, Container, NavbarBrand, NavbarToggle, NavbarCollapse, Nav, NavLink} from "react-bootstrap";

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('homepage');

    return (
        <Navbar expand="lg">
            <Container>
                <NavbarBrand href="#home">
                    <img src="/images/LOGO.jpeg" alt="LOGO" style={{ width: '80px', height: 'auto' }}/>
                </NavbarBrand>
                <NavbarToggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggle-icon"></span>
                </NavbarToggle>
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink href="#home"></NavLink>
                        <NavLink href="#icon"></NavLink>
                        <NavLink href="#icon"></NavLink>
                    </Nav>
                    <span className="navbar-text">
                        <div className="social-icons">
                            <a href="#"><img src="/images/LOGO.jpeg" alt=""/> </a>
                            <a href="#"><img src="/images/LOGO.jpeg" alt=""/> </a>
                            <a href="#"><img src="/images/LOGO.jpeg" alt=""/> </a>
                        </div>
                        <button className="vvd" onClick={() => console.log('connect')}>
                            <span>Let's connect</span>
                        </button>
                    </span>
                </NavbarCollapse>


            </Container>
        </Navbar>
    )
}
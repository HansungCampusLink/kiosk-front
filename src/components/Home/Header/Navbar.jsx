// src/components/NavBar.jsx
import React from "react";
import { Navbar, Container, NavbarBrand } from "react-bootstrap";
import { useNavigate, useLocation  } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 경로 가져오기

    const handleLogoClick = () => {
        if (location.pathname === '/home') {
            // 홈 화면일 경우 새로고침
            window.location.reload();
        } else {
            // 다른 페이지일 경우 홈 화면으로 이동
            navigate('/home');
        }
    };

    return (
        <Navbar expand="lg" className="justify-content-center">
            <Container className="justify-content-center">
                <NavbarBrand onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                    <img src="/images/miniLOGO_cropped.png" alt="Mini Logo" style={{ width: '30px', height: 'auto', margin: '20px' }} />
                </NavbarBrand>
            </Container>
        </Navbar>
    );
};

export default NavBar;

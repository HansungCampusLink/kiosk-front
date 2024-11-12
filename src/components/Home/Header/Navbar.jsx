// src/components/NavBar.jsx
import React from "react"; // React 라이브러리 임포트
import { Navbar, Container, NavbarBrand } from "react-bootstrap"; // Bootstrap 컴포넌트 임포트
import { useNavigate, useLocation  } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 및 현재 경로 확인을 위한 useLocation
import './Navbar.css'; // NavBar 컴포넌트의 스타일 파일 임포트

// NavBar 컴포넌트 정의
export const NavBar = () => {
    const navigate = useNavigate(); // 페이지 이동에 사용하는 훅
    const location = useLocation(); // 현재 경로를 가져오는 훅

    // 로고 클릭 시 실행되는 함수
    const handleLogoClick = () => {
        if (location.pathname === '/home') { // 만약 현재 페이지가 '/home'일 경우
            window.location.reload(); // 페이지를 새로고침
        } else {
            navigate('/home'); // 다른 페이지일 경우 '/home' 페이지로 이동
        }
    };

    return (
        // 중앙 정렬된 네비게이션 바 설정
        <Navbar expand="lg" className="navbar-container">
            <Container className="justify-content-center">
                <NavbarBrand onClick={handleLogoClick} className="navbar-brand">
                    <img src="/images/miniLOGO_cropped.png" alt="Mini Logo" className="navbar-logo" /> {/* 로고 이미지 */}
                </NavbarBrand>
            </Container>
        </Navbar>
    );
};

export default NavBar; // NavBar 컴포넌트를 기본 내보내기
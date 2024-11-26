// src/components/NavBar.jsx
import React from "react"; // React 라이브러리 임포트
import { Navbar, Container, NavbarBrand } from "react-bootstrap"; // Bootstrap 컴포넌트 임포트
import { useNavigate, useLocation  } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 및 현재 경로 확인을 위한 useLocation
import './Navbar.css';
import {useDispatch, useSelector} from "react-redux";
import {resetMessages} from "../../../redux/chatSlice"; // NavBar 컴포넌트의 스타일 파일 임포트

// NavBar 컴포넌트 정의
export const NavBar = ({ showBackButton, onBackButtonClick }) => { // showBackButton 및 onBackButtonClick props 추가
    const navigate = useNavigate(); // 페이지 이동에 사용하는 훅
    const location = useLocation(); // 현재 경로를 가져오는 훅
    const dispatch = useDispatch(); // Redux 액션을 디스패치하기 위한 훅
    const theme = useSelector((state) => state.theme.mode); // Redux 상태에서 theme 가져오기


    // 로고 클릭 시 실행되는 함수
    const handleLogoClick = () => {
        const basePath = '/home'; // 기본 경로

        if (location.pathname === basePath) {
            dispatch(resetMessages()); // Redux 상태 초기화
            window.history.replaceState(null, '', basePath); // URL의 querystring 제거
            window.location.reload();
        } else {
            dispatch(resetMessages()); // Redux 상태 초기화
            navigate(basePath); // /home으로 이동
        }
    };


    return (
        // 중앙 정렬된 네비게이션 바 설정
        <Navbar expand="lg" className="navbar-container">
            <Container>
                {showBackButton && ( // 조건부로 Back 버튼 표시
                    <img
                        src= {theme === 'light' ? '/images/icons/Back-key.png' : '/images/icons/Back-key_white_inverted.png'}
                        alt="Back"
                        className="back-button"
                        onClick={onBackButtonClick} /> // 뒤로 가기 버튼 클릭 시 onBackButtonClick 호출
                )}
                <NavbarBrand onClick={handleLogoClick} style={{cursor: 'pointer'}}>
                    <img src="/images/icons/miniLOGO_cropped.png" alt="Mini Logo" className="navbar-logo"/>
                </NavbarBrand>
            </Container>
        </Navbar>
    );
};

export default NavBar; // NavBar 컴포넌트를 기본 내보내기
// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트
import './Footer.css';
import {toggleTheme} from "../../../redux/themeSlice";
import {useDispatch, useSelector} from "react-redux"; // 스타일 시트를 별도로 임포트

const Footer = ( ) => {
    const theme = useSelector((state) => state.theme.mode); // Redux에서 테마 상태 가져오기
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTheme()); // Redux 액션 디스패치
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                © HansungCampusLink |{' '}
                <Link to="/team-info" className="team-info-link">Contact Us</Link> |{' '}
                <a href="https://www.hansung.ac.kr" target="_blank" rel="noopener noreferrer" className="hansung-link">
                    Hansung University
                </a>
            </div>
                <div className="toggle-switch" onClick={handleToggle}> {/* 토글 스위치 */}
                    <div className={`toggle-circle ${theme === 'dark' ? 'toggle-dark' : 'toggle-light'}`}></div>
                </div>


        </footer>

    );
};

export default Footer;
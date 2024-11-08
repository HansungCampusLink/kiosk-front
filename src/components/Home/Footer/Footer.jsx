// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트
import './Footer.css'; // 스타일 시트를 별도로 임포트

const Footer = () => {
    return (
        <footer className="footer">
            © HansungCampusLink |{' '}
            <Link to="/team-info" className="team-info-link">Contact Us</Link> |{' '}
            <a href="https://www.hansung.ac.kr" target="_blank" rel="noopener noreferrer" className="hansung-link">
                Hansung University
            </a>
        </footer>
    );
};

export default Footer;
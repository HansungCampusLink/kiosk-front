// src/components/Loading/LoadingPage.jsx
import React, { useEffect } from 'react';
import './LoadingPage.css'; // 부팅 스타일 시트 임포트
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate

const LoadingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home'); // 부팅 후 HomePage로 이동
        }, 2000); // 애니메이션 시간 설정

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, [navigate]);

    return (
        <div className="loading-page">
            <img src={`${process.env.PUBLIC_URL}/images/miniLOGO.png`} alt="Mascot" className="mascot-animation" />
        </div>
    );
};

export default LoadingPage;

// src/components/Loading/LoadingPage.jsx
import React, { useEffect } from 'react';
import './LoadingPage.css'; // 부팅 스타일 시트 임포트
import {useLocation, useNavigate} from 'react-router-dom'; // 페이지 이동을 위한 useNavigate

const LoadingPage = () => {
    const location = useLocation(); // 현재 URL 정보 가져오기
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const chatId = params.get('chatId'); // 쿼리 파라미터에서 chatId 추출

        const timer = setTimeout(() => {
            if (chatId) {
                // chatId가 있을 경우 쿼리 유지하며 /home으로 이동
                navigate(`/home${location.search}`);
            } else {
                // chatId가 없을 경우 일반 /home으로 이동
                navigate('/home');
            }
        }, 1850); // 애니메이션 시간 설정

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, [location, navigate]);



    return (
        <div className="loading-page">
            <img src={`${process.env.PUBLIC_URL}/images/icons/miniLOGO.png`} alt="Mascot" className="mascot-animation" />
        </div>
    );
};

export default LoadingPage;

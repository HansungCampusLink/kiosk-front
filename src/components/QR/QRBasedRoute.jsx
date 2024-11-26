import React, { useState, useEffect } from 'react';
import {Navigate, useLocation} from 'react-router-dom';

const QRBasedRoute = ({ children }) => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);

    // 모바일 환경 감지 로직
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isMobileDevice = /iPhone|Android/i.test(userAgent) && !/iPad/i.test(userAgent);
        setIsMobile(isMobileDevice); // 모바일 여부 설정
    }, []);

    // 모바일이 아닐 경우, 홈으로 리디렉션
    if (!isMobile) {
        return <Navigate to="/home" state={{ from: location }} replace />;
    }

    // 모바일 환경일 경우, 자식 컴포넌트 렌더링
    return children;
};

export default QRBasedRoute;

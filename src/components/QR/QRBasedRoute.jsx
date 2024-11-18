import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const QRBasedRoute = ({ children }) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const isFromQR = params.get('fromQR') === 'true'; // QR 코드 접속 여부 확인
    const [isMobile, setIsMobile] = useState(false); // 모바일 환경 여부
    const [showAlert, setShowAlert] = useState(false); // 알림 상태

    // 모바일 환경 확인
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isMobileDevice = /iPhone|Android/i.test(userAgent) && !/iPad/i.test(userAgent); // iPad 제외
        setIsMobile(isMobileDevice);

        if (isFromQR && !isMobileDevice) {
            setShowAlert(true); // 모바일 환경이 아닌 경우 알림 표시
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000); // 3초 후 알림 숨기기

            return () => clearTimeout(timer); // 타이머 정리
        }
    }, [isFromQR]);

    // QR 코드가 아닌 경우 또는 모바일 환경이 아닌 경우
    if (!isFromQR || !isMobile) {
        if (showAlert) {
            return (
                <div style={alertStyles}>
                    QR 코드 접속은 모바일 환경에서만 권장됩니다.
                </div>
            );
        }
        return <Navigate to="/" replace />;
    }

    // QR 코드 및 모바일 환경에서만 렌더링
    return children;
};

const alertStyles = {
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    borderRadius: '5px',
    fontSize: '16px',
    textAlign: 'center',
    zIndex: 1000,
};

export default QRBasedRoute;

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QRBasedRoute = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false); // 모바일 환경 여부
    const [showAlert, setShowAlert] = useState(false); // 알림 상태

    // 모바일 환경 확인
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isMobileDevice = /iPhone|Android/i.test(userAgent) && !/iPad/i.test(userAgent); // iPad 제외
        setIsMobile(isMobileDevice);

        if (isMobileDevice) {
            // 모바일 환경이면 /mobile로 리다이렉트
            if (location.pathname !== '/mobile') {
                navigate('/mobile', { replace: true });
            }

        } else {
            setShowAlert(true); // 모바일 환경이 아닌 경우 알림 표시
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000); // 3초 후 알림 숨기기

            return () => clearTimeout(timer); // 타이머 정리

            // 모바일 환경이 아니면 /로 리다이렉트
            if (location.pathname !== '/') {
                navigate('/', { replace: true });
            }
        }
    }, [location, navigate]);

    // 모바일 환경이 아닌 경우에는 렌더링 안 함
    if (!isMobile) {
        return null;
    }

    // 모바일 환경에서만 렌더링
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

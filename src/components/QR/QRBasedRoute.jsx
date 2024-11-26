// import { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
//
// const QRBasedRoute = ({ children }) => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [isMobile, setIsMobile] = useState(false); // 모바일 환경 여부
//
//     // 모바일 환경 확인
//     useEffect(() => {
//         const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//         const isMobileDevice = /iPhone|Android/i.test(userAgent) && !/iPad/i.test(userAgent); // iPad 제외
//         setIsMobile(isMobileDevice);
//
//         if (isMobileDevice) {
//             // 모바일 환경이면 /mobile로 리다이렉트
//             if (location.pathname !== '/mobile') {
//                 navigate('/mobile', { replace: true });
//             }
//
//         } else {
//             // 모바일 환경이 아니면 /로 리다이렉트
//             if (location.pathname !== '/') {
//                 navigate('/', { replace: true });
//             }
//         }
//     }, [location, navigate]);
//
//     // 모바일 환경이 아닌 경우에는 렌더링 안 함
//     if (!isMobile) {
//         return null;
//     }
//
//     // 모바일 환경에서만 렌더링
//     return children;
// };
//
//
// export default QRBasedRoute;

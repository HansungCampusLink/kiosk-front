// src/components/Mobile/MobilePage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const MobilePage = () => {
    const location = useLocation(); // URL의 쿼리 파라미터 또는 경로 가져오기
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get('message') || '환영합니다!';

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>{message}</h1>
            <p>모바일 화면에서 QR 코드를 통해 접속한 페이지입니다.</p>
        </div>
    );
};

export default MobilePage;

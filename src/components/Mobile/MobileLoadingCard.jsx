// src/components/Chat/LoadingCard.jsx
import React from 'react';
import './MobileLoadingCard.css'; // 스타일 시트 임포트

const LoadingCard = () => {
    return (
        <div className="mobile-loading-card">
            <div className="mobile-loading-dots">
                <span className="mobile-dot"></span>
                <span className="mobile-dot"></span>
                <span className="mobile-dot"></span>
            </div>
        </div>
    );
};

export default LoadingCard;

// src/components/Chat/LoadingCard.jsx
import React from 'react';
import './LoadingCard.css'; // 스타일 시트 임포트

const LoadingCard = () => {
    return (
        <div className="loading-card">
            <div className="loading-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    );
};

export default LoadingCard;

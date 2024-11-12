// InactivityWarning.jsx

import React from 'react';
import './InactivityWarning.css';

function InactivityWarning({ timeLeft }) {
    return (
        <div className="inactivity-warning">
            <p>{timeLeft}초 후 메인 화면으로 돌아갑니다.</p>
            <p>질문이 더 있으시다면 화면을 터치 해 주세요 !</p>

        </div>
    );
}

export default InactivityWarning;

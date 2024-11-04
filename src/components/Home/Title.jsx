import React, { useEffect, useRef } from 'react';
import './HomePage.css';

function TypingText() {
    const textRef = useRef(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (textRef.current) {
                textRef.current.style.borderRight = 'none'; // 애니메이션 종료 후 커서 제거
            }
        }, 3000); // 타이핑 애니메이션이 3초 동안 진행되므로, 3초 후에 커서 제거

        return () => clearTimeout(timeoutId); // 컴포넌트가 언마운트되면 타이머 정리
    }, []);

    return (
        <div className="typing-text-container">
            <h3 ref={textRef} className="typing-text"> 상상부기에게 물어봐 !</h3>
        </div>
    );
}

export default TypingText;

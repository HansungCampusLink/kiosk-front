// SuggestedQuestions.jsx

import React from 'react'; // React 임포트
import './SuggestedQuestions.css'; // 스타일 시트 임포트

function SuggestedQuestions({ setSelectedSuggestion }) {
    // 추천 질문 목록
    const suggestions = [
        '밥은 어디서 먹지..?',
        '비교과 정보 !',
        '한성대 기숙사는?',
        '교내에 건강관리실 있어?',
        '공지사항 좀 보여줘',
        '한기준 교수님 연구실 어디야?',
    ];

    return (
        <div className="suggested-questions-container">
            {suggestions.map((suggestion, index) => (
                <div
                    key={index}
                    className="suggestion-button"
                    onClick={() => setSelectedSuggestion(suggestion)} // 클릭 시 추천 질문 설정
                >
                    {suggestion}
                </div>
            ))}
        </div>
    );
}

export default SuggestedQuestions; // SuggestedQuestions 컴포넌트 내보내기

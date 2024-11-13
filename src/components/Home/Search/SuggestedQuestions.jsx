// SuggestedQuestions.jsx

import React from 'react'; // React 임포트
import './SuggestedQuestions.css'; // 스타일 시트 임포트

function SuggestedQuestions({ setSelectedSuggestion }) {
    // 추천 질문 목록
    const suggestions = [
        '도서관 자리 얼마나 남았어?',
        '제일 가까운 화장실은?',
        '학식당 오늘의 메뉴!',
        '상상관이 어디야?',
        '공지사항 좀 보여줘',
        '000교수님 연구실이 어디야?'
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

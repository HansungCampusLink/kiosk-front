import React from 'react'; // React 임포트

function SuggestedQuestions() {
    // 추천 질문 목록
    const suggestions = [
        '학교 위치는 어디인가요?',
        '학사 일정은 어떻게 되나요?',
        '학과 소개는 어디서 볼 수 있나요?'
    ];

    return (
        <div>
            <h2>추천 질문</h2> {/* 추천 질문 제목 */}
            <ul>
                {/* 추천 질문 목록을 순회하며 리스트 항목 생성 */}
                {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li> // 각 추천 질문을 리스트 항목으로 표시
                ))}
            </ul>
        </div>
    );
}

export default SuggestedQuestions; // SuggestedQuestions 컴포넌트 내보내기

// SearchBar.jsx
import React, { useState, useEffect } from 'react'; // React와 useState 훅 임포트
import { useDispatch } from 'react-redux'; // Redux의 useDispatch 훅 임포트
import { sendUserMessage } from '../../redux/chatSlice'; // 메시지 전송 액션 임포트

function SearchBar({ who, major, selectedSuggestion, setSelectedSuggestion, onFirstMessage  }) {
    const [question, setQuestion] = useState(''); // 사용자가 입력한 질문을 저장하는 상태 변수
    const dispatch = useDispatch(); // Redux의 dispatch 함수를 사용하여 액션을 보낼 준비

    // selectedSuggestion이 변경될 때 question 상태를 업데이트
    useEffect(() => {
        if (selectedSuggestion) {
            setQuestion(selectedSuggestion); // 추천 질문을 입력 필드에 표시
            setSelectedSuggestion(''); // 이후 추천 질문 초기화
        }
    }, [selectedSuggestion, setSelectedSuggestion]);



    // 질문을 전송하는 함수
    const handleSubmit = () => {
        if (question.trim()) {
            const requestData = {
                who: who,
                major: major,
                messages: [
                    { role: 'user', content: question },
                ]
            }; // 질문이 비어있지 않은 경우에만 전송

            dispatch(sendUserMessage(requestData)); // 입력한 질문을 Redux 스토어로 전송
            setQuestion(''); // 질문 입력 필드 초기화

            if (onFirstMessage) onFirstMessage(); // 첫 메시지 전송 시 콜백 호출
        }
    };

    return (
        <div className="input-container"> {/* 입력 컨테이너 */}
            {/* 질문 입력을 위한 텍스트 필드 */}
            <input
                type="text"
                placeholder="질문을 입력하세요" // 입력 필드의 플레이스홀더
                value={question} // 상태로부터 입력값을 가져옴
                onChange={(e) => setQuestion(e.target.value)} // 입력값이 변경될 때 상태 업데이트
                className="input" // CSS 클래스 적용
            />
            {/* 질문 전송 버튼 */}
            <button onClick={handleSubmit} className="send-button">전송</button> {/* 클릭 시 handleSubmit 함수 호출 */}
        </div>
    );
}

export default SearchBar; // SearchBar 컴포넌트를 외부로 내보냄

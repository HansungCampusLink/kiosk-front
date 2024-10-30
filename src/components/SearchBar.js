import React, { useState } from 'react'; // React와 useState 임포트
import { useDispatch } from 'react-redux'; // Redux의 useDispatch 임포트
import { sendMessage } from '../redux/chatSlice'; // 질문 전송 액션 임포트

function SearchBar() {
    const [question, setQuestion] = useState(''); // 사용자가 입력한 질문을 저장하는 상태
    const dispatch = useDispatch(); // Redux의 dispatch 함수를 사용하여 액션을 보낼 준비

    // 질문을 전송하는 함수
    const handleSubmit = () => {
        if (question) { // 질문이 비어있지 않은 경우에만 전송
            dispatch(sendMessage(question)); // 입력한 질문을 Redux 스토어로 전송
            setQuestion(''); // 입력 필드 초기화
        }
    };

    return (
        <div className="input-container"> {/* 입력 컨테이너 */}
            {/* 질문 입력을 위한 텍스트 필드 */}
            <input
                type="text"
                placeholder="질문을 입력하세요"
                value={question}
                onChange={(e) => setQuestion(e.target.value)} // 입력 값 변경 시 상태 업데이트
                className="input" // CSS 클래스 적용
            />
            {/* 질문 전송 버튼 */}
            <button onClick={handleSubmit} className="send-button">전송</button> {/* 클릭 시 질문 전송 */}
        </div>
    );
}

export default SearchBar; // SearchBar 컴포넌트 내보내기

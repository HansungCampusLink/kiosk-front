import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreMessagesFromUrl, sendMessage } from '../../redux/chatSlice'; // Redux 액션
import { parseChatIdFromUrl } from '../../redux/utils/urlUtils'; // URL에서 chatId를 추출하는 유틸리티 함수
import './MobilePage.css'; // 모바일 화면 스타일

const MobilePage = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages); // Redux에서 메시지 목록 가져오기
    const [inputValue, setInputValue] = useState(''); // 사용자 입력 상태 관리
    const chatWindowRef = useRef(null); // 채팅창 스크롤 위치 관리를 위한 Ref

    // URL에 포함된 chatId를 기반으로 채팅 기록 복원
    useEffect(() => {
        const chatId = parseChatIdFromUrl(); // URL에서 chatId 추출
        if (chatId) {
            dispatch(restoreMessagesFromUrl(chatId)); // chatId로 메시지 복원
        }
    }, [dispatch]);

    // 메시지가 추가될 때마다 채팅창 자동 스크롤
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTo({
                top: chatWindowRef.current.scrollHeight, // 스크롤을 맨 아래로 설정
                behavior: 'smooth', // 부드럽게 이동
            });
        }
    }, [messages]);

    // 메시지 전송 핸들러
    const handleSendMessage = () => {
        if (inputValue.trim()) {
            dispatch(sendMessage({ role: 'user', content: inputValue.trim() })); // Redux로 사용자 메시지 전송
            setInputValue(''); // 입력 필드 초기화
        }
    };

    return (
        <div className="mobile-page">
            {/* 헤더 섹션 */}
            <header className="mobile-header">
                <h1>한성대 키오스크</h1>
                <p>모바일 환경에서 테스트 중입니다.</p>
            </header>

            {/* 채팅창 */}
            <main className="mobile-chat-window" ref={chatWindowRef}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mobile-message ${
                            msg.role === 'user' ? 'mobile-user-message' : 'mobile-assistant-message'
                        }`} // 역할에 따라 클래스 다르게 적용
                    >
                        <p>{msg.content}</p>
                    </div>
                ))}
            </main>

            {/* 입력창 */}
            <footer className="mobile-footer">
                <div className="mobile-input-container">
                    <input
                        type="text"
                        value={inputValue} // 입력값
                        onChange={(e) => setInputValue(e.target.value)} // 입력값 변경
                        placeholder="질문을 입력하세요..." // 플레이스홀더 텍스트
                    />
                    <button onClick={handleSendMessage}>전송</button>
                </div>
            </footer>
        </div>
    );
};

export default MobilePage;

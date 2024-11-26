import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchChatHistoryById,
    sendUserMessage,
    setChatId
} from '../../redux/chatSlice'; // Redux 액션
import { parseChatIdFromUrl } from '../../redux/utils/urlUtils'; // URL에서 chatId를 추출하는 유틸리티 함수
import './MobilePage.css';
import QRCodeGenerator from "../QR/QRCodeGenerator";
import MobileLoadingCard from "./MobileLoadingCard"; // 모바일 화면 스타일

const MobilePage = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages) || []; // Redux에서 메시지 가져오기, 기본값 빈 배열
    const chatId = useSelector((state) => state.chat.chatId); // Redux에서 chatId 가져오기
    const [inputValue, setInputValue] = useState('');
    const chatWindowRef = useRef(null);
    const loading = useSelector((state) => state.chat.loading); // 로딩 상태 가져오기
    const [qrVisibility, setQrVisibility] = useState({}); // 각 메시지의 QR 코드 표시 여부 상태

    // URL에서 chatId를 파싱하고 메시지 복원
    useEffect(() => {
        const parsedChatId = parseChatIdFromUrl();
        console.log("Parsed Chat ID in MobilePage:", parsedChatId); // 디버깅용 로그
        if (parsedChatId) {
            dispatch(setChatId(parsedChatId)); // Redux에 chatId 저장
            dispatch(fetchChatHistoryById(parsedChatId)); // chatId로 메시지 복원
        }
    }, [dispatch]);

    // Redux 상태 변화 디버깅
    useEffect(() => {
        console.log("Redux chatId in MobilePage:", chatId);
        console.log("Redux messages in MobilePage:", messages);
    }, [chatId, messages]);

    // 메시지가 추가될 때마다 채팅창 자동 스크롤
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTo({
                top: chatWindowRef.current.scrollHeight, // 스크롤을 맨 아래로 설정
                behavior: 'smooth', // 부드럽게 이동
            });
        }
    }, [messages]);

    const handleSendMessage = () => {
        console.log("Input Value:", inputValue);
        if (inputValue.trim()) {
            const requestData = chatId
                ? {
                    chatId: chatId.toString() || null,
                    messages: [
                        ...messages,
                        { role: 'user', content: inputValue.trim() },
                    ],
                }
                : {
                    messages: [
                        ...messages,
                        { role: 'user', content: inputValue.trim() },
                    ],
                };
            console.log("Dispatching Send Message with:", requestData);
            dispatch(sendUserMessage(requestData));
            setInputValue('');
        }
    };

    const toggleQrVisibility = (index) => {
        setQrVisibility((prev) => ({
            ...prev,
            [index]: !prev[index], // 해당 메시지 QR 코드 표시 여부 토글
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };


    return (
        <div className="mobile-page">
            {/* 헤더 섹션 */}
            <header className="mobile-header">
                <h1>탐정부기</h1>
                <p> 어디서든 탐정부기와의 대화를 이어가세요 !</p>
            </header>

            {/* 채팅창 */}
            <main className="mobile-chat-window" ref={chatWindowRef}>
                {Array.isArray(messages) && messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mobile-message ${
                                msg.role === 'user' ? 'mobile-user-message' : 'mobile-assistant-message'
                            }`}
                        >
                            <p>{msg.content}</p>
                            {/* 이미지 렌더링 */}
                            {msg.image && msg.destination && (
                                <img
                                    src={msg.image}
                                    alt={`${msg.destination} 이미지`}
                                    className="mobile-building-image"
                                />
                            )}
                            {/* 큐알코드 토글 버튼 및 렌더링 */}
                            {msg.ref && msg.ref.length > 0 && (
                                <>
                                    <img
                                        src={qrVisibility[index]
                                            ? '/images/icons/QRicon.png'
                                            : '/images/icons/QRicon.png'}
                                        alt="QR Toggle"
                                        className="qr-toggle-icon"
                                        onClick={() => toggleQrVisibility(index)}
                                    />
                                    {qrVisibility[index] && (
                                        <div className="mobile-qr-grid">
                                            {msg.ref.map((ref, refIndex) => (
                                                <div key={refIndex} className="mobile-qr-grid-item">
                                                    <QRCodeGenerator refLink={ref}/>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))
                ): (
                    <p className="no-messages">대화가 없습니다. 메시지를 입력해 주세요.</p>
                )}
                {loading && <MobileLoadingCard />} {/* 로딩 애니메이션 표시 */}
            </main>

            {/* 입력창 */}
            <footer className="mobile-footer">
                <div className="mobile-input-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="질문을 입력하세요..."
                    />
                    <button onClick={handleSendMessage}>전송</button>
                </div>
            </footer>
        </div>
    );
};

export default MobilePage;

// ChatWindow.jsx
import React, {useState, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import QRCodeGenerator from '../QR/QRCodeGenerator';
import LoadingCard from './LoadingCard'; // 로딩 카드 컴포넌트 추가
import './ChatWindow.css';

function ChatWindow({ isExpanded }) {
    // Redux 스토어에서 메시지 목록을 가져옴
    const messages = useSelector((state) => state.chat.messages); // 메시지 목록을 state에서 추출
    const loading = useSelector((state) => state.chat.loading); // Redux의 loading 상태를 바로 가져옴
    const [showQRLinks, setShowQRLinks] = useState(false); // QR 코드 영역 표시 여부 상태 추가
    const chatWindowRef = useRef(null); // 스크롤을 위한 ref 추가
    const [lastMessageKey, setLastMessageKey] = useState(null); // 이전에 존재하지 않는 고유 메시지 추적

    // 새 메시지가 추가될 때마다 메시지 창 스크롤과 윈도우 스크롤을 동시에 아래로 이동
    useEffect(() => {
        if (chatWindowRef.current) {
            // 메시지 창 내부 스크롤 이동
            chatWindowRef.current.scrollTo({
                top: chatWindowRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }

        // 브라우저 전체 스크롤 이동
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });

        // 새 메시지가 추가될 때마다 마지막 메시지 인덱스를 갱신
        if (messages.length > 0) {
            // 최신 메시지로 스크롤을 이동하고 새 메시지를 추적하여 애니메이션 적용
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
            setLastMessageKey(messages[messages.length-1].content); // 가장 최신 메시지 식별자 갱신
        }
    }, [messages, loading]);


    const toggleQRLinks = (index) => {
        setShowQRLinks((prev) => ({
            ...prev,
            [index]: !prev[index], // 해당 메시지의 QR 링크 표시 여부 토글
        }));
    };

    if (!messages) {
        console.error("Messages is undefined or null");
        return <p className="error">메시지를 불러올 수 없습니다.</p>;
    }

    return (
        <div className={`chat-window ${isExpanded ? 'expanded' : ''}`} ref={chatWindowRef}> {/* 채팅 창 컨테이너 */}
            {loading && <LoadingCard/>} {/* 로딩 중일 때 로딩 카드 표시 */}
            {/* messages 배열을 순회하여 각 메시지를 표시 */}
            {[...messages].reverse().map((msg, index) => ( // messages 배열을 역순으로 출력하여 최신 메시지가 아래로 쌓임
                <div
                    key={index}
                    className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'} ${
                        lastMessageKey === msg.content ? 'new-message' : ''
                    }`} // 최신 메시지에만 애니메이션
                >
                    {/* AI 응답일 경우 facelogo 출력 */}
                    {msg.role === 'assistant' && (
                        <img src="/images/facelogo.png" alt="Assistant Logo" className="assistant-logo"/>
                    )}
                    <p>{msg.content || '메시지가 없습니다'}</p>

                    {/* 추천 링크가 있는 경우 리스트로 표시 */}
                    {msg.ref && (
                        <div className="qr-section">
                            <button
                                onClick={() => toggleQRLinks(index)} // 개별 메시지에 대한 QR 표시 여부 토글
                                className="qr-toggle-button"
                            >
                                {showQRLinks[index] ? '▲' : '▼'}
                            </button>
                            {showQRLinks[index] && (
                                <ul className="ref-list">
                                    {msg.ref.map((ref, refIndex) => (
                                        <li key={refIndex} className="ref-item">
                                            <a href={ref} target="_blank" rel="noopener noreferrer">
                                                {ref}
                                            </a>
                                            <QRCodeGenerator refLink={ref}/>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ChatWindow; // ChatWindow 컴포넌트를 외부로 내보냄
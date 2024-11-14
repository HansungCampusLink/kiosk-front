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

    const chatWindowRef = useRef(null); // 스크롤을 위한 ref 추가

    // 메시지가 업데이트될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages, loading]); // messages와 loading 상태가 변경될 때마다 실행


    if (!messages) {
        console.error("Messages is undefined or null");
        return <p className="error">메시지를 불러올 수 없습니다.</p>;
    }

    return (
        <div className={`chat-window ${isExpanded ? 'expanded' : ''}`} ref={chatWindowRef}> {/* 채팅 창 컨테이너 */}
            {/* messages 배열을 순회하여 각 메시지를 표시 */}
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
                >
                    {/* AI 응답일 경우 facelogo 출력 */}
                    {msg.role === 'assistant' && (
                        <img src="/images/facelogo.png" alt="Assistant Logo" className="assistant-logo"/>
                    )}
                    <p>{msg.content || '메시지가 없습니다'}</p>

                    {/* 추천 링크가 있는 경우 리스트로 표시 */}
                    {msg.ref && (
                        <ul className="ref-list">
                            {msg.ref.map((ref, refIndex) => (
                                <li key={refIndex} className="ref-item">
                                    <a href={ref} target="_blank" rel="noopener noreferrer">{ref}</a>
                                    {/* QRCodeGenerator를 사용하여 QR 코드 출력 */}
                                    <QRCodeGenerator refLink={ref}/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
            {loading && <LoadingCard/>} {/* 로딩 중일 때 로딩 카드 표시 */}
        </div>
    );
}

export default ChatWindow; // ChatWindow 컴포넌트를 외부로 내보냄
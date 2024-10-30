// ChatWindow.js
import React from 'react'; // React 라이브러리 임포트
import { useSelector } from 'react-redux'; // Redux의 useSelector 훅 임포트

function ChatWindow() {
    // Redux 스토어에서 메시지 목록을 가져옴
    const messages = useSelector((state) => state.chat.messages); // 메시지 목록을 state에서 추출

    return (
        <div className="chat-window"> {/* 채팅 창 컨테이너 */}
            {/* messages 배열을 순회하여 각 메시지를 표시 */}
            {messages.map((msg, index) => (
                <div key={index}> {/* 각 메시지의 키로 index 사용 */}
                    <p><strong>{msg.role === 'user' ? 'User' : 'Assistant'}:</strong> {msg.content}</p> {/* 메시지 역할에 따라 사용자 또는 AI 표시 */}
                    {/* 추천 링크가 있는 경우 리스트로 표시 */}
                    {msg.ref && (
                        <ul>
                            {msg.ref.map((ref, refIndex) => (
                                <li key={refIndex}><a href={ref}>{ref}</a></li> /* 각 링크를 리스트 항목으로 표시 */
                                ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ChatWindow; // ChatWindow 컴포넌트를 외부로 내보냄
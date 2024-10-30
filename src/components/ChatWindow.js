import React from 'react'; // React 임포트
import { useSelector } from 'react-redux'; // Redux의 useSelector 임포트

function ChatWindow() {
    // Redux 스토어에서 메시지 목록 가져오기
    const messages = useSelector((state) => state.chat.messages);

    return (
        <div className="chat-window"> {/* 채팅 창 컨테이너 */}
            {/* 메시지 목록을 순회하며 각 메시지를 표시 */}
            {messages.map((msg, index) => (
                <div key={index}>
                    {/* 메시지 역할에 따라 사용자 또는 어시스턴트 표시 */}
                    <p><strong>{msg.role === 'user' ? 'User' : 'Assistant'}:</strong> {msg.content}</p>
                    {/* 추천 링크가 있는 경우 리스트로 표시 */}
                    {msg.ref && (
                        <ul>
                            {msg.ref.map((ref, refIndex) => (
                                <li key={refIndex}><a href={ref}>{ref}</a></li>
                                ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ChatWindow; // ChatWindow 컴포넌트 내보내기

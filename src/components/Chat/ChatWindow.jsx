// ChatWindow.jsx
import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QRCodeGenerator from '../QR/QRCodeGenerator';
import LoadingCard from './LoadingCard'; // 로딩 카드 컴포넌트 추가
import { fetchChatHistoryById, setChatId } from '../../redux/chatSlice';
import { parseChatIdFromUrl } from '../../redux/utils/urlUtils';
import './ChatWindow.css';

function ChatWindow({ isExpanded }) {
    const dispatch = useDispatch(); // Redux 디스패치 사용

    // Redux 스토어에서 메시지 목록을 가져옴
    const messages = useSelector((state) => state.chat.messages); // 메시지 목록을 state에서 추출
    const loading = useSelector((state) => state.chat.loading); // Redux의 loading 상태를 바로 가져옴
    const chatId = useSelector((state) => state.chat.chatId); // chatId 추가
    const [showQRLinks, setShowQRLinks] = useState(false); // QR 코드 영역 표시 여부 상태 추가
    const chatWindowRef = useRef(null); // 스크롤을 위한 ref 추가
    const [lastMessageKey, setLastMessageKey] = useState(null); // 이전에 존재하지 않는 고유 메시지 추적
    const [qrVisible, setQRVisible] = useState(false); //: 공유 QR 코드 표시 여부 상태 추가


    // URL에서 chatId 파싱 및 히스토리 로드
    useEffect(() => {
        const parsedChatId = parseChatIdFromUrl();
        if (parsedChatId && !chatId) { // chatId가 없는 경우에만 호출
            dispatch(fetchChatHistoryById(parsedChatId));
        }
    }, [dispatch, chatId]);


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


    // URL에 chatId 포함
    const currentUrl = `${window.location.origin}${window.location.pathname}?chatId=${chatId}`;

    const toggleQRLinks = (index) => {
        setShowQRLinks((prev) => ({
            ...prev,
            [index]: !prev[index], // 해당 메시지의 QR 링크 표시 여부 토글
        }));
    };

    const toggleQRVisibility = () => {
        setQRVisible((prev) => !prev); // QR 코드 표시 여부 토글
    };

    if (!messages) {
        console.error("Messages is undefined or null");
        return <p className="error">메시지를 불러올 수 없습니다.</p>;
    }

    return (
        <div className={`chat-window ${isExpanded ? 'expanded' : ''}`} ref={chatWindowRef}> {/* 채팅 창 컨테이너 */}


            {/* 전체 대화를 QR 코드로 공유할 수 있는 버튼 */}
            <button onClick={toggleQRVisibility} className="qr-share-button">
                {qrVisible ? '▼' : '▲'}
            </button>

            {qrVisible && (
                <div className="qr-container">
                    <QRCodeGenerator refLink={currentUrl}/> {/* QR 코드 생성 */}
                    {/*<p className="qr-url">{currentUrl}</p> /!* 현재 URL 표시 *!/*/}
                    <p className="qr-url-message">웹이나 패드로 qr 접속시 홈페이지로 돌아갑니다.</p>
                    <p className="qr-url-message">모바일 권장 qr 코드 입니다.</p>
                </div>
            )}
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
                        <div className="qr-section-container">
                            <button
                                onClick={() => toggleQRLinks(index)} // 개별 메시지에 대한 QR 표시 여부 토글
                                className="qr-toggle-button"
                            >
                                {showQRLinks[index] ? '▲' : '▼'}
                            </button>
                            <div className={`qr-section ${showQRLinks[index] ? 'open' : ''}`}> {/* 열리고 닫히는 애니메이션 적용 */}
                                <ul className="ref-list">
                                    {msg.ref.map((ref, refIndex) => (
                                        <li key={refIndex} className="ref-item">
                                            <a href={ref} target="_blank" rel="noopener noreferrer">
                                                {ref}
                                            </a>
                                            <QRCodeGenerator refLink={ref} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ChatWindow; // ChatWindow 컴포넌트를 외부로 내보냄
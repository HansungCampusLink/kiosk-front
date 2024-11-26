// SearchBar.jsx
import React, {useState, useEffect, useRef} from 'react'; // React와 useState 훅 임포트
import {useDispatch, useSelector} from 'react-redux'; // Redux의 useDispatch 훅 임포트
import {sendUserMessage} from '../../../redux/chatSlice'; // 메시지 전송 액션 임포트
import {updateUrlWithChatId} from '../../../redux/utils/urlUtils'; // URL 유틸리티 함수
import './SearchBar.css';
import QRCodeGenerator from "../../QR/QRCodeGenerator";


function SearchBar({who, major, selectedSuggestion, setSelectedSuggestion, onFirstMessage, isExpanded}) {
    const [question, setQuestion] = useState(''); // 사용자가 입력한 질문을 저장하는 상태 변수
    const messages = useSelector((state) => state.chat.messages); // 전체 메시지 내역 가져오기
    const chatId = useSelector((state) => state.chat.chatId); // chatId 추가
    const isOpenAI = useSelector((state) => state.chat.openAi); // IsOpenAI Redux 상태 가져오기
    const dispatch = useDispatch(); // Redux의 dispatch 함수를 사용하여 액션을 보낼 준비
    const [qrVisible, setQRVisible] = useState(false); //: 공유 QR 코드 표시 여부 상태 추가
    const theme = useSelector((state) => state.theme.mode); // Redux 상태에서 theme 가져오기

    const inputRef = useRef(null); // Ref 생성

    // 컴포넌트가 렌더링될 때 input 필드에 포커스 설정
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus(); // input 필드에 포커스 설정
        }
    }, []); // 빈 배열이므로 컴포넌트 마운트 시 1회 실행

    // selectedSuggestion이 변경될 때 question 상태를 업데이트
    useEffect(() => {
        if (selectedSuggestion) {
            setQuestion(selectedSuggestion); // 추천 질문을 입력 필드에 표시
            setSelectedSuggestion(''); // 이후 추천 질문 초기화
        }
    }, [selectedSuggestion, setSelectedSuggestion]);

    // 음성인식 시작 함수
    const startListening = () => {
        const recognition = new window.webkitSpeechRecognition(); // 음성 인식 객체 생성
        recognition.lang = 'ko-KR'; // 한국어 설정
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setQuestion(transcript); // 인식된 텍스트를 SearchBar에 설정
        };

        recognition.start();
    };

    // 질문을 전송하는 함수
    const handleSubmit = () => {
        if (question.trim()) {
            const requestData =
                chatId ? { // chatId가 있을 경우
                        chatId: chatId.toString(), // 기존 chatId 포함
                        who: who,
                        major: major,
                        openAi: isOpenAI, // IsOpenAI 값을 포함
                        messages: [
                            ...messages,
                            {role: 'user', content: question},
                        ],
                    }
                    : { // chatId가 없을 경우
                        who: who,
                        major: major,
                        openAi: isOpenAI, // IsOpenAI 값을 포함
                        messages: [
                            ...messages,
                            {role: 'user', content: question},
                        ],
                    };

            console.log('Sending requestData:', requestData); // 디버깅용 로그
            dispatch(sendUserMessage(requestData)); // 입력한 질문을 Redux 스토어로 전송

            // URL 업데이트
            if (chatId) {
                updateUrlWithChatId(chatId); // chatId만 URL에 추가
            }

            setQuestion(''); // 질문 입력 필드 초기화

            if (onFirstMessage) onFirstMessage(); // 첫 메시지 전송 시 콜백 호출
        }
    };


    // Enter 키로 질문 전송 처리 추가
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Enter 키 중복 입력 방지
            handleSubmit();
        }
    };

    const toggleQRVisibility = () => {
        setQRVisible((prev) => !prev); // QR 코드 표시 여부 토글
    };

    // URL에 chatId 포함
    const currentUrl = `${window.location.origin}${window.location.pathname}?chatId=${chatId}`;

    return (
        <div className="input-container"> {/* 입력 컨테이너 */}

            {/* 전체 대화를 QR 코드로 공유할 수 있는 버튼 */}
            {isExpanded && (
                <button onClick={toggleQRVisibility} className="qr-share-button">
                    <img
                        src={theme === 'light' ? '/images/icons/link-icon.png' : '/images/icons/link-icon_white.png'}
                        alt="Share Link Icon"
                        className="qr-share-icon"
                    />
                </button>
            )}
            {qrVisible && (
                <div className="qr-modal">
                    <div className="qr-modal-content">
                        <button className="qr-modal-close" onClick={toggleQRVisibility}>
                            &times;
                        </button>
                        <QRCodeGenerator refLink={currentUrl}/>
                        <p className="qr-url-message">웹이나 패드로 QR 접속 시 홈페이지로 돌아갑니다.</p>
                        <p className="qr-url-message">모바일 권장 QR 코드입니다.</p>
                    </div>
                </div>
            )}

            {/* 질문 입력을 위한 텍스트 필드 */}
            <input
                ref={inputRef} // Ref 연결
                type="text"
                placeholder="질문을 입력하세요" // 입력 필드의 플레이스홀더
                value={question} // 상태로부터 입력값을 가져옴
                onChange={(e) => setQuestion(e.target.value)} // 입력값이 변경될 때 상태 업데이트
                onKeyDown={handleKeyDown} // Enter 키 입력 처리
                className="input" // CSS 클래스 적용
            />
            {/* 음성인식 버튼 */}
            <button onClick={startListening} className="voice-button"/>
            {/* 음성인식 시작 버튼 */}
            {/* 질문 전송 버튼 */}
            <button onClick={handleSubmit} className="send-button"/>
            {/* 클릭 시 handleSubmit 함수 호출 */}
        </div>
    );
}

export default SearchBar; // SearchBar 컴포넌트를 외부로 내보냄

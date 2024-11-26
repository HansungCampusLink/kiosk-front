import React, {useState, useEffect, useRef, useContext} from 'react'; // React 및 필요한 hooks 임포트
import {useDispatch, useSelector} from "react-redux";
import SearchBar from './Search/SearchBar'; // 질문 입력 컴포넌트 임포트
import SuggestedQuestions from './Search/SuggestedQuestions'; // 추천 질문 컴포넌트 임포트
import ChatWindow from '../Chat/ChatWindow'; // 채팅 창 컴포넌트 임포트
import TypingText from "./Title";
import { NavBar } from "./Header/Navbar.jsx"; // 네비게이션 바 컴포넌트 임포트
import Footer from "./Footer/Footer.jsx"; // 풋터 컴포넌트 임포트
import InactivityWarning from './Warnings/InactivityWarning'; // 추가: 알림 카드 컴포넌트
import WeatherCard from './Weather/WeatherCard';

import './HomePage.css'; // CSS 스타일 시트 임포트
import {fetchChatHistoryById, resetMessages, setIsOpenAI} from "../../redux/chatSlice";
import KakaoMap from "../KakaoMap/KakaoMap";
import {parseChatIdFromUrl} from "../../redux/utils/urlUtils";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [who, setWho] = useState('student'); // 사용자 유형의 기본값 'student'
    const [major, setMajor] = useState('Unknown'); // 전공 기본값 'Unknown'
    const [destination, setDestination] = useState('Unknown'); // 기본값: Unknown
    const [selectedSuggestion, setSelectedSuggestion] = useState(''); // 추천 질문 상태를 관리
    const [showSuggestions, setShowSuggestions] = useState(true); // 추천 질문 표시 여부
    const [isExpanded, setIsExpanded] = useState(false); // 첫 채팅 후 body 확장 여부 상태
    const [showLeftPanel, setShowLeftPanel] = useState(true); // left-panel 표시 여부 추가
    const [inactivityWarning, setInactivityWarning] = useState(false); // 비활성 알림 상태 추가
    const [inactivityTimer, setInactivityTimer] = useState(30); // 남은 초 표시
    const [isChatStarted, setIsChatStarted] = useState(false); // 채팅 시작 여부 상태 추가
    const [showMap, setShowMap] = useState(true); // 지도의 표시 여부 상태 관리

    const [showAnimationMessage, setShowAnimationMessage] = useState(false);
    const [animationMessage, setAnimationMessage] = useState(''); // 애니메이션 메시지

    const isOpenAI = useSelector((state) => state.chat.IsOpenAI); // Redux에서 OpenAI 상태 가져오기

    const messages = useSelector((state) => state.chat.messages); // Redux 메시지 확인

    // // ThemeContext에서 theme와 toggleTheme 가져오기
    // const { theme, toggleTheme } = useContext(ThemeContext);
    const theme = useSelector((state) => state.theme.mode); // 현재 테마 가져오기

    // 사용자가 선택한 'who' 값을 설정하는 함수, 'who' 값 토글 방식으로 설정
    const handleWhoChange = (value) => setWho((prev) => (prev === value ? 'Unknown' : value));

    // 사용자가 선택한 'major' 값을 설정하는 함수,  'major' 값 토글 방식으로 설정
    const handleMajorChange = (value) => setMajor((prev) => (prev === value ? 'Unknown' : value));

    // 페이지가 마운트될 때 상태 초기화
    useEffect(() => {
        // 페이지 초기화 함수
        const resetToInitialState = () => {
            setWho('학생');
            setMajor('Unknown');
            setDestination("Unknown")
            setSelectedSuggestion('');
            setShowSuggestions(true);
            setIsExpanded(false);
            setShowLeftPanel(true);
            setInactivityWarning(false);
            setInactivityTimer(30);
            setIsChatStarted(false); // 채팅 시작 상태 초기화
        };

        const currentPath = window.location.pathname;
        const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
        const chatId = parseChatIdFromUrl(); // URL에서 chatId 추출

        // 모바일 디바이스인 경우 처리
        if (isMobileDevice && currentPath !== '/mobile') {
            navigate(`/mobile${chatId ? `?chatId=${chatId}` : ''}`, { replace: true });
        }


        if (!chatId) {
            // chatId가 없는 경우에만 초기화
            dispatch(resetMessages()); // Redux 상태 초기화
            resetToInitialState(); // 로컬 상태 초기화
        } else {
            // chatId가 있는 경우에는 히스토리 복원
            dispatch(fetchChatHistoryById(chatId)); // 히스토리 불러오기
            setIsExpanded(true); // 채팅창 확장
            setShowLeftPanel(false); // 좌측 패널 숨김
            setIsChatStarted(true); // 채팅이 이미 시작된 상태로 설정
        }
    }, [dispatch, navigate]);


    // 첫 메시지 전송 시 호출되는 함수로, 추천 질문을 숨기고 body를 확장
    const handleFirstMessage = () => {
        setShowSuggestions(false); // 첫 메시지 전송 후 추천 질문 비표시
        setIsExpanded(true); // 첫 채팅 시 body가 확장되도록 설정
        setShowLeftPanel(false); // 첫 메시지 이후 left-panel을 숨김
        setIsChatStarted(true); // 첫 메시지 전송 시 채팅 시작 상태로 전환
    };

    // 뒤로 가기 버튼 클릭 시 left-panel을 토글
    const handleBackButtonClick = () => {
        setShowLeftPanel((prev) => !prev); // left-panel 표시 토글

        if (!showLeftPanel) {
            setIsExpanded(false); // left-panel 표시 시 오른쪽 패널 축소
            setShowMap(false); // 지도 숨김
            setShowSuggestions(false);
        }
    };


    const toggleMapVisibility = () => {
        setShowMap((prev) => !prev); // 지도 표시 상태 반전

    };

    const toggleOpenAI = () => {
        const newIsOpenAI = !isOpenAI; // 현재 값을 반전
        dispatch(setIsOpenAI(newIsOpenAI)); // Redux 상태 업데이트
        // console.log(newIsOpenAI);

        setAnimationMessage(newIsOpenAI ? 'OpenAI On!' : 'OpenAI Off!'); // 메시지 설정
        setShowAnimationMessage(true); // 애니메이션 활성화

        // 애니메이션 메시지를 일정 시간 후 숨기기
        setTimeout(() => {
            setShowAnimationMessage(false);
        }, 2000); // 2초 후 숨기기
    };

    // 사용자 입력 감지: 이벤트가 발생할 때마다 타이머 리셋
    const resetInactivityTimer = () => {
        setInactivityTimer(30); // 타이머 리셋
        setInactivityWarning(false); // 알림 숨기기
    };

    // 비활성 감지: 1분 후 알림 표시, 30초 후 메인으로 이동
    useEffect(() => {
        if (messages.length > 0) { // 메시지가 존재할 때만 타이머 시작
            const idleTimer = setTimeout(() => {
                setInactivityWarning(true); // 비활성 알림 표시
            }, 60000); // 1분 후 알림 표시 (테스트 시에는 5초)

            const countdown = inactivityWarning && setInterval(() => {
                setInactivityTimer((prev) => prev - 1);
            }, 1000); //  초당 감소

            if (inactivityTimer === 0) {
                window.location.href = '/'; // 0초 시 메인 화면으로 이동
            }

            return () => {
                clearTimeout(idleTimer);
                clearInterval(countdown); // 컴포넌트 언마운트 시 타이머 정리
            };
        }
    }, [messages, inactivityWarning, inactivityTimer]);

    // 이벤트 리스너 등록: 마우스, 키보드, 터치 이벤트 감지
    useEffect(() => {
        window.addEventListener('mousemove', resetInactivityTimer);
        window.addEventListener('keydown', resetInactivityTimer);
        window.addEventListener('touchstart', resetInactivityTimer);

        return () => {
            window.removeEventListener('mousemove', resetInactivityTimer);
            window.removeEventListener('keydown', resetInactivityTimer);
            window.removeEventListener('touchstart', resetInactivityTimer);
        };
    }, []);




    return (
        <div className={`App ${isExpanded ? 'expanded-app' : ''}`}> {/* 첫 채팅 여부에 따라 App 크기 확장 */}
            <header>
                <NavBar showBackButton={!showLeftPanel} onBackButtonClick={handleBackButtonClick} /> {/* Back 버튼 조건부 표시 */}
            </header>
            <main className={`body ${isExpanded ? 'expanded' : ''}`}> {/* 동적으로 expanded 클래스 적용 */}
                {showLeftPanel && ( // left-panel 표시 여부에 따라 표시/숨김
                    <div className="left-panel animate-left-panel">
                        <div className="selection-group">
                            <p className="selection-group-title">너는 누구야?</p>
                            <div className="selection-buttons">
                                <button onClick={() => handleWhoChange('학생')} className={who === '학생' ? 'selected-button' : ''}>학생</button>
                                <button onClick={() => handleWhoChange('교수님')} className={who === '교수님' ? 'selected-button' : ''}>교수님</button>
                                <button onClick={() => handleWhoChange('방문자')} className={who === '방문자' ? 'selected-button' : ''}>방문자</button>
                            </div>
                        </div>
                        <div className="selection-group">
                            <p className="selection-group-title">혹시 소속 단과대는?</p>
                            <div className="selection-buttons">
                                <button onClick={() => handleMajorChange('크리에이티브인문예술')}
                                        className={major === '크리에이티브인문예술' ? 'selected-button' : ''}>크리에이티브인문예술
                                </button>
                                <button onClick={() => handleMajorChange('미래융합사회과학')}
                                        className={major === '미래융합사회과학' ? 'selected-button' : ''}>미래융합사회과학
                                </button>
                                <button onClick={() => handleMajorChange('디자인대학')}
                                        className={major === '디자인대학' ? 'selected-button' : ''}>디자인대학
                                </button>
                                <button onClick={() => handleMajorChange('IT공과')}
                                        className={major === 'IT공과' ? 'selected-button' : ''}>IT공과
                                </button>

                                <button onClick={() => handleMajorChange('창의융합')}
                                        className={major === '창의융합' ? 'selected-button' : ''}>창의융합
                                </button>
                                <button onClick={() => handleMajorChange('상상력교양')}
                                        className={major === '상상력교양' ? 'selected-button' : ''}>상상력교양
                                </button>
                                <button onClick={() => handleMajorChange('미래플러스')}
                                        className={major === '미래플러스' ? 'selected-button' : ''}>미래플러스
                                </button>
                            </div>
                        </div>


                        {/* 추가된 버튼들 */}
                        <div className="icon-buttons">
                        </div>
                        <div className="left-panel-bottom">
                            {showAnimationMessage && (
                                <div className="openai-message animate-message">{animationMessage}</div>
                            )}
                            <button className="left-panel-bottom-icon-button" onClick={toggleMapVisibility}>
                                <img
                                    src={theme === 'light' ? '/images/icons/map-icon2.png' : '/images/icons/map-icon2_white.png'}
                                    alt="Map Icon"/>
                            </button>
                            <button className="left-panel-bottom-icon-button" onClick={toggleOpenAI}>
                                <img
                                    src={theme === 'light' ? '/images/icons/Open_Logo.png' : '/images/icons/Open_Logo_White.png'}
                                    alt="openai Icon"/>
                            </button>

                            {/* WeatherCard를 왼쪽 패널 하단에 추가 */}
                            <WeatherCard/>

                        </div>
                    </div>
                )}

                {/* 우측 패널: 채팅 및 질문 입력 */}
                <div className={`right-panel ${showLeftPanel ? '' : 'full-width'}`}> {/* left-panel 없을 때 화면 전체 채우기 */}
                    <div className="chat-container">
                        <TypingText/> {/* 타이핑 애니메이션을 위한 클래스 */}

                        <div
                            className={`map-container ${
                                showMap && !isExpanded ? 'show-map' : 'hide-map'
                            }`}
                        >
                            {showMap && !isExpanded && <KakaoMap setQuestion={setSelectedSuggestion} />}

                        </div>

                        {showSuggestions && (
                            <SuggestedQuestions setSelectedSuggestion={setSelectedSuggestion}/>
                        )}
                        {isChatStarted && <ChatWindow isExpanded={isExpanded}/>} {/* 채팅 창 컴포넌트 */}
                        <SearchBar
                            who={who}
                            major={major}
                            selectedSuggestion={selectedSuggestion}
                            setSelectedSuggestion={setSelectedSuggestion}
                            onFirstMessage={handleFirstMessage}
                            isExpanded={isExpanded}
                        /> {/* 질문 입력 컴포넌트 */}


                    </div>
                </div>
            </main>
            <Footer /> {/*  Footer 추가 */}
            {inactivityWarning && <InactivityWarning timeLeft={inactivityTimer} />} {/* 알림 카드 표시 */}
        </div>
    );
}

export default HomePage; // HomePage 컴포넌트 내보내기

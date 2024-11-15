import React, {useState, useEffect, useRef, useContext} from 'react'; // React 및 필요한 hooks 임포트
import {useSelector} from "react-redux";
import SearchBar from './Search/SearchBar'; // 질문 입력 컴포넌트 임포트
import SuggestedQuestions from './Search/SuggestedQuestions'; // 추천 질문 컴포넌트 임포트
import ChatWindow from '../Chat/ChatWindow'; // 채팅 창 컴포넌트 임포트
import TypingText from "./Title";
import { NavBar } from "./Header/Navbar.jsx"; // 네비게이션 바 컴포넌트 임포트
import Footer from "./Footer/Footer.jsx"; // 풋터 컴포넌트 임포트
import { ThemeContext } from '../../context/ThemeContext'; // ThemeContext 임포트
import InactivityWarning from './Warnings/InactivityWarning'; // 추가: 알림 카드 컴포넌트
import WeatherCard from './Weather/WeatherCard';

import './HomePage.css'; // CSS 스타일 시트 임포트


function HomePage() {
    const [who, setWho] = useState('student'); // 사용자 유형의 기본값 'student'
    const [major, setMajor] = useState('null'); // 전공 기본값 'null'
    const [selectedSuggestion, setSelectedSuggestion] = useState(''); // 추천 질문 상태를 관리
    const [showSuggestions, setShowSuggestions] = useState(true); // 추천 질문 표시 여부
    const [isExpanded, setIsExpanded] = useState(false); // 첫 채팅 후 body 확장 여부 상태
    const [showLeftPanel, setShowLeftPanel] = useState(true); // left-panel 표시 여부 추가
    const [inactivityWarning, setInactivityWarning] = useState(false); // 비활성 알림 상태 추가
    const [inactivityTimer, setInactivityTimer] = useState(30); // 남은 초 표시
    const [isChatStarted, setIsChatStarted] = useState(false); // 채팅 시작 여부 상태 추가

    const messages = useSelector((state) => state.chat.messages); // Redux 메시지 확인

    // ThemeContext에서 theme와 toggleTheme 가져오기
    const { theme, toggleTheme } = useContext(ThemeContext);

    // 사용자가 선택한 'who' 값을 설정하는 함수
    const handleWhoChange = (value) => setWho(value);

    // 사용자가 선택한 'major' 값을 설정하는 함수
    const handleMajorChange = (value) => setMajor(value);


    // 페이지가 마운트될 때 상태 초기화
    useEffect(() => {
        // 페이지 초기화 함수
        const resetToInitialState = () => {
            setWho('student');
            setMajor('null');
            setSelectedSuggestion('');
            setShowSuggestions(true);
            setIsExpanded(false);
            setShowLeftPanel(true);
            setInactivityWarning(false);
            setInactivityTimer(30);
            setIsChatStarted(false); // 채팅 시작 상태 초기화
        };

        resetToInitialState(); // 컴포넌트가 마운트될 때 초기화
    }, []);


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
        }
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
                                <button onClick={() => handleWhoChange('student')} className={who === 'student' ? 'selected-button' : ''}>Student</button>
                                <button onClick={() => handleWhoChange('professor')} className={who === 'professor' ? 'selected-button' : ''}>Professor</button>
                                <button onClick={() => handleWhoChange('deliver')} className={who === 'deliver' ? 'selected-button' : ''}>Deliver</button>
                                <button onClick={() => handleWhoChange('visitor')} className={who === 'visitor' ? 'selected-button' : ''}>Visitor</button>
                                <button onClick={() => handleWhoChange('others')} className={who === 'others' ? 'selected-button' : ''}>Others</button>
                            </div>
                        </div>
                        <div className="selection-group">
                            <p className="selection-group-title">혹시 소속 단과대는?</p>
                            <div className="selection-buttons">
                                <button onClick={() => handleMajorChange('humanities')} className={major === 'humanities' ? 'selected-button' : ''}>Humanities</button>
                                <button onClick={() => handleMajorChange('social sciences')} className={major === 'social sciences' ? 'selected-button' : ''}>Social Sciences</button>
                                <button onClick={() => handleMajorChange('arts')} className={major === 'arts' ? 'selected-button' : ''}>Arts</button>
                                <button onClick={() => handleMajorChange('engineering')} className={major === 'engineering' ? 'selected-button' : ''}>Engineering</button>
                            </div>
                        </div>

                        {/* WeatherCard를 왼쪽 패널 하단에 추가 */}
                        <WeatherCard />
                    </div>
                )}

                {/* 우측 패널: 채팅 및 질문 입력 */}
                <div className={`right-panel ${showLeftPanel ? '' : 'full-width'}`}> {/* left-panel 없을 때 화면 전체 채우기 */}
                    <div className="chat-container">
                        <TypingText/> {/* 타이핑 애니메이션을 위한 클래스 */}

                        {showSuggestions && (
                            <SuggestedQuestions setSelectedSuggestion={setSelectedSuggestion}/>
                        )}
                        {isChatStarted && <ChatWindow isExpanded={isExpanded} />} {/* 채팅 창 컴포넌트 */}
                        <SearchBar
                            who={who}
                            major={major}
                            selectedSuggestion={selectedSuggestion}
                            setSelectedSuggestion={setSelectedSuggestion}
                            onFirstMessage={handleFirstMessage}
                        /> {/* 질문 입력 컴포넌트 */}


                    </div>
                </div>
            </main>
            <Footer theme={theme} toggleTheme={toggleTheme} /> {/*  Footer 추가 */}
            {inactivityWarning && <InactivityWarning timeLeft={inactivityTimer} />} {/* 알림 카드 표시 */}
        </div>
    );
}

export default HomePage; // HomePage 컴포넌트 내보내기

import React, { useState, useEffect, useRef } from 'react'; // React 임포트
import SearchBar from '../Search/SearchBar'; // 질문 입력 컴포넌트 임포트
import SuggestedQuestions from '../Search/SuggestedQuestions'; // 추천 질문 컴포넌트 임포트
import ChatWindow from '../Chat/ChatWindow'; // 채팅 창 컴포넌트 임포트
import TypingText from "./Title";
import { NavBar } from "./Navbar"; // 네비게이션 바 컴포넌트 임포트
import './HomePage.css'; // CSS 스타일 시트 임포트

function HomePage() {
    const [who, setWho] = useState('student'); // 기본값 'student'
    const [major, setMajor] = useState('null'); // 기본값 'null'
    const [selectedSuggestion, setSelectedSuggestion] = useState(''); // 추천 질문 상태 추가
    const [showSuggestions, setShowSuggestions] = useState(true); // 추천 질문 표시 여부
    const [isExpanded, setIsExpanded] = useState(false); // 첫 채팅 후 확장 상태 애니메이션

    const handleWhoChange = (value) => setWho(value); // 'who' 값 설정
    const handleMajorChange = (value) => setMajor(value); // 'major' 값 설정

    const handleFirstMessage = () => {
        setShowSuggestions(false); // 첫 메시지 전송 후 추천 질문을 숨김
        setIsExpanded(true); // 첫 채팅이 작성되면 확장 상태로 설정
    };


    return (
        <div className="App">
            {/*<NavBar /> /!* 네비게이션 바 추가 *!/*/}
            <div className="App-header">
                {/* 좌측 패널: who와 major 선택 버튼 */}
                <div className="left-panel">
                    {/* Who 버튼 그룹 */}
                    <div className="selection-group">
                        <p className="selection-group-title">너는 누구야?</p> {/* 타이틀 텍스트 */}
                        <div className="selection-buttons">
                            {/* 선택된 who 값에 따라 스타일링 */}
                            <button
                                onClick={() => handleWhoChange('student')}
                                className={who === 'student' ? 'selected-button' : ''}
                            >Student
                            </button>
                            <button
                                onClick={() => handleWhoChange('professor')}
                                className={who === 'professor' ? 'selected-button' : ''}
                            >Professor
                            </button>
                            <button
                                onClick={() => handleWhoChange('deliver')}
                                className={who === 'deliver' ? 'selected-button' : ''}
                            >Deliver
                            </button>
                            <button
                                onClick={() => handleWhoChange('visitor')}
                                className={who === 'visitor' ? 'selected-button' : ''}
                            >Visitor
                            </button>
                        </div>
                    </div>

                    {/* Major 버튼 그룹 */}
                    <div className="selection-group">
                        <p className="selection-group-title">혹시 전공은?</p> {/* 타이틀 텍스트 */}
                        <div className="selection-buttons">
                            {/* 선택된 major 값에 따라 스타일링 */}
                            <button
                                onClick={() => handleMajorChange('computer_science')}
                                className={major === 'computer_science' ? 'selected-button' : ''}
                            >Computer Science
                            </button>
                            <button
                                onClick={() => handleMajorChange('mechanical')}
                                className={major === 'mechanical' ? 'selected-button' : ''}
                            >Mechanical
                            </button>
                            <button
                                onClick={() => handleMajorChange('electrical')}
                                className={major === 'electrical' ? 'selected-button' : ''}
                            >Electrical
                            </button>
                            <button
                                onClick={() => handleMajorChange('marketing')}
                                className={major === 'marketing' ? 'selected-button' : ''}
                            >Marketing
                            </button>
                        </div>
                    </div>
                </div>

                {/* 우측 패널: 채팅 및 질문 입력 */}
                <div className="right-panel">
                    <div className="chat-container">
                        <TypingText/> {/* 타이핑 애니메이션을 위한 클래스 */}
                        <SearchBar
                            who={who}
                            major={major}
                            selectedSuggestion={selectedSuggestion}
                            setSelectedSuggestion={setSelectedSuggestion}
                            onFirstMessage={handleFirstMessage}
                        /> {/* 질문 입력 컴포넌트 */}
                        {showSuggestions && (
                            <SuggestedQuestions setSelectedSuggestion={setSelectedSuggestion}/>
                        )}
                        <ChatWindow/> {/* 채팅 창 컴포넌트 */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage; // HomePage 컴포넌트 내보내기

import React from 'react'; // React 임포트
import SearchBar from './SearchBar'; // 질문 입력 컴포넌트 임포트
import SuggestedQuestions from './SuggestedQuestions'; // 추천 질문 컴포넌트 임포트
import ChatWindow from './ChatWindow'; // 채팅 창 컴포넌트 임포트
import './HomePage.css'; // CSS 스타일 시트 임포트

function HomePage() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>무엇이 궁금하신가요?</h1> {/* 제목 */}
                <div className="chat-container"> {/* 채팅 컴포넌트들이 위치할 컨테이너 */}
                    <SearchBar /> {/* 질문 입력 컴포넌트 */}
                    <SuggestedQuestions /> {/* 추천 질문 컴포넌트 */}
                    <ChatWindow /> {/* 채팅 창 컴포넌트 */}
                </div>
            </header>
        </div>
    );
}

export default HomePage; // HomePage 컴포넌트 내보내기

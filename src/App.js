import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './components/Home/HomePage.jsx';
import MobilePage from './components/Mobile/MobilePage.jsx'; // MobilePage 컴포넌트 임포트
import LoadingPage from "./components/Home/Loading/LoadingPage.jsx";
import TeamInfoPage from './components/Home/Footer/TeamInfoPage.jsx';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<LoadingPage />} /> {/* 부팅 페이지 */}
                    <Route path="/home" element={<HomePage />} /> {/* 메인 페이지 */}
                    {/* 특정 경로에서 MobilePage를 렌더링 */}
                    <Route path="/www.hansung/article/123" element={<MobilePage />} />
                    <Route path="/team-info" element={<TeamInfoPage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;

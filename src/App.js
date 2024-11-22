import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Provider, useSelector} from 'react-redux'; // Provider는 최상위로 이동
import store from './redux/store';
import HomePage from './components/Home/HomePage.jsx';
import MobilePage from './components/Mobile/MobilePage.jsx';
import LoadingPage from "./components/Home/Loading/LoadingPage.jsx";
import TeamInfoPage from './components/Home/Footer/TeamInfoPage.jsx';
import QRBasedRoute from "./components/QR/QRBasedRoute";

function AppContent() {
    const theme = useSelector((state) => state.theme.mode); // 테마 상태 가져오기

    return (
        <div className={`app ${theme}`}> {/* 테마에 따라 클래스 변경 */}
            <Router>
                <Routes>
                    <Route path="/" element={<LoadingPage />} /> {/* 부팅 페이지 */}
                    <Route path="/home" element={<HomePage />} /> {/* 메인 페이지 */}
                    <Route
                        path="/mobile"
                        element={
                            <QRBasedRoute>
                                <MobilePage />
                            </QRBasedRoute>
                        }
                    />
                    <Route path="/team-info" element={<TeamInfoPage />} />
                </Routes>
            </Router>
        </div>
    );
}

function App() {
    return (
        <Provider store={store}>
            <AppContent /> {/* Provider 내부에서 상태를 가져오는 컴포넌트 */}
        </Provider>
    );
}

export default App;

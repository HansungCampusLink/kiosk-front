import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Provider, useSelector} from 'react-redux'; // Provider는 최상위로 이동
import store from './redux/store';
import HomePage from './components/Home/HomePage.jsx';
import MobilePage from './components/Mobile/MobilePage.jsx';
import LoadingPage from "./components/Home/Loading/LoadingPage.jsx";
import TeamInfoPage from './components/Home/Footer/TeamInfoPage.jsx';
import QRBasedRoute from "./components/QR/QRBasedRoute";
import './App.css';

function AppContent() {
    const theme = useSelector((state) => state.theme.mode); // 현재 테마 가져오기


    // body에 테마 클래스 동적 적용
    useEffect(() => {
        document.body.className = theme; // theme 값에 따라 body 클래스 변경
    }, [theme]); // theme 값이 변경될 때마다 실행


    return (
        <div className={`app ${theme}`}> {/* app 컴포넌트에 테마 클래스 추가 */}
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

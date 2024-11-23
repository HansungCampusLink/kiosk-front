import React, {useEffect} from 'react';
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

    // body 태그에 테마 클래스 추가
    useEffect(() => {
        document.body.className = theme; // body 클래스 동적으로 설정
    }, [theme]);

    return (

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

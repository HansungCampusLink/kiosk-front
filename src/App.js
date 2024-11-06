import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './components/Home/HomePage.jsx';
import MobilePage from './components/Mobile/MobilePage.jsx'; // MobilePage 컴포넌트 임포트

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {/* 기본 경로에서 HomePage를 렌더링 */}
                    <Route path="/" element={<HomePage />} />

                    {/* 특정 경로에서 MobilePage를 렌더링 */}
                    <Route path="/www.hansung/article/123" element={<MobilePage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;

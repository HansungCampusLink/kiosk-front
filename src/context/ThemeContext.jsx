// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // 기본 테마를 'light'로 설정

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };


    useEffect(() => {
        // 현재 테마에 맞는 CSS 파일 로드
        const themeFile = theme === 'light' ? 'light-theme.css' : 'dark-theme.css';
        import(`./styles/themes/${themeFile}`).then(() => {
            document.documentElement.setAttribute('data-theme', theme); // 테마 적용을 위한 data 속성 추가
        });
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

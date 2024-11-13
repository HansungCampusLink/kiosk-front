// WeatherCard.jsx
import React, { useEffect, useState } from 'react';
import './WeatherCard.css';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 현재 날짜 및 시간 설정 예정
        // const today = new Date();
        // const year = today.getFullYear();
        // const month = String(today.getMonth() + 1).padStart(2, '0');
        // const day = String(today.getDate()).padStart(2, '0');
        // const hours = String(today.getHours()).padStart(2, '0') + "00"; // 정시 기준으로 설정
        // const base_date = `${year}${month}${day}`;
        // const base_time = hours;
        //
        // // 서울 한성대 근처 좌표 (nx, ny)
        // const nx = 60;  // X 좌표 예시
        // const ny = 127; // Y 좌표 예시

        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `/weather-api/api/typ02/openApi/VilageFcstInfoService_2.0/getUltraSrtNcst?pageNo=1&numOfRows=1000&dataType=JSON&base_date=20241113&base_time=1200&nx=55&ny=127&authKey=E-S5JcLETQmkuSXCxJ0Jfg`
                );
                const data = await response.json();

                if (data.response.header.resultCode === "00") { // 성공 응답 확인
                    setWeather(data.response.body.items.item);
                } else {
                    setError("날씨 정보를 불러오지 못했습니다.");
                }
            } catch (error) {
                setError("네트워크 오류로 날씨 정보를 불러오지 못했습니다.");
            }
        };

        // 즉시 실행
        fetchWeather();
    }, []);

    const renderWeatherIcon = (pty) => {
        switch (pty) {
            case "1": return <WiRain />;           // 비
            case "2": return <WiRain />;           // 비/눈
            case "3": return <WiSnow />;           // 눈
            case "4": return <WiThunderstorm />;   // 천둥번개
            default: return <WiDaySunny />;        // 맑음
        }
    };

    if (error) return <div className="weather-card">오류: {error}</div>;
    if (!weather) return <div className="weather-card">날씨 정보를 불러오는 중...</div>;

    // 필요한 데이터 필터링
    const temperature = weather.find(item => item.category === 'T1H')?.obsrValue;
    const humidity = weather.find(item => item.category === 'REH')?.obsrValue;
    const rainCondition = weather.find(item => item.category === 'PTY')?.obsrValue;
    const windSpeed = weather.find(item => item.category === 'WSD')?.obsrValue;

    return (
        <div className="weather-card">
            <h3>현재 날씨</h3>
            <div className="weather-icon">
                {renderWeatherIcon(rainCondition)}
            </div>
            <p>온도: {temperature}°C</p>
            <p>습도: {humidity}%</p>
            <p>풍속: {windSpeed}m/s</p>
        </div>
    );
};

export default WeatherCard;

// WeatherCard.jsx
import React, { useEffect, useState } from 'react';
import './WeatherCard.css';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        //현재 날짜 및 시간 설정 예정
        const today = new Date(); // 현재 날짜와 시간을 얻음
        const year = today.getFullYear(); // 현재 연도를 4자리로 가져옴 (예: 2024)
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 현재 월을 2자리 문자열로 변환 (1월 -> '01')
        const day = String(today.getDate()).padStart(2, '0'); // 현재 일을 2자리 문자열로 변환 (3일 -> '03')
        const hours = String(today.getHours()).padStart(2, '0') + "00"; // 현재 시간을 정시 기준으로 2자리 + "00" 형태로 변환 (14시 -> '1400')

        const base_date = `${year}${month}${day}`; // API에서 요구하는 날짜 형식(YYYYMMDD)으로 포맷
        const base_time = hours; // API에서 요구하는 시간 형식(HHmm)

        // 서울 한성대 근처 좌표 (nx, ny)
        const nx = 60;  // X 좌표 예시
        const ny = 127; // Y 좌표 예시

        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `/weather-api/api/typ02/openApi/VilageFcstInfoService_2.0/getUltraSrtNcst?pageNo=1&numOfRows=1000&dataType=JSON&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}&authKey=E-S5JcLETQmkuSXCxJ0Jfg`
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

    // const renderWeatherIcon = (pty) => {
    //     switch (pty) {
    //         case "1": return <p>비</p>;            // 비
    //         case "2": return <p>비/눈</p>;            // 비/눈
    //         case "3": return <p>눈</p>;            // 눈
    //         case "4": return <p>천둥번개</p>;            // 천둥번개
    //         default: return <p>맑음</p>;            // 맑음
    //     }
    // };



    if (error) return <div className="weather-card">오류: {error}</div>;
    if (!weather) return <div className="weather-card">날씨 정보를 불러오는 중...</div>;

    // 필요한 데이터 필터링
    const temperature = weather.find(item => item.category === 'T1H')?.obsrValue;
    const humidity = weather.find(item => item.category === 'REH')?.obsrValue;
    const rainCondition = weather.find(item => item.category === 'PTY')?.obsrValue;
    const windSpeed = weather.find(item => item.category === 'WSD')?.obsrValue;

    return (
        <div className="weather-card">
            <p>현재 날씨</p>
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

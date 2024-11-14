// WeatherCard.jsx
import React, { useEffect, useState } from 'react';
import './WeatherCard.css';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // OpenWeatherMap API 키 (발급받은 키로 대체하세요)
    const apiKey = 'b6b47e81ea01906269b5de5aea18e2c5';
    const location = 'Seongbuk-gu,KR'; // 지역 설정 변수: 성북구 (한국)


    useEffect(() => {


        // 실시간 날씨 정보를 가져오는 함수 정의
        const fetchWeather = async () => {
            try {
                // OpenWeatherMap API에 성북구 날씨 요청
                const response = await fetch(`/weather-api/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
                const data = await response.json();

                if (response.ok) {
                    setWeather(data);
                } else {
                    setError("날씨 정보를 불러오지 못했습니다.");
                }
            } catch (error) {
                setError("네트워크 오류로 날씨 정보를 불러오지 못했습니다.");
            }
        };

        // 데이터 요청 즉시 실행
        fetchWeather();
    }, [apiKey]);

    // 날씨 상태에 따른 아이콘 설정
    const renderWeatherIcon = (weatherMain) => {
        if (weatherMain === "Rain") return <WiRain />;
        if (weatherMain === "Snow") return <WiSnow />;
        if (weatherMain === "Thunderstorm") return <WiThunderstorm />;
        return <WiDaySunny />;
    };


    // 5초마다 온도, 습도, 풍속이 회전하는 애니메이션 설정
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 6000); // 6초마다 변경
        return () => clearInterval(interval);
    }, []);



    if (error) return <div className="weather-card">오류: {error}</div>;
    if (!weather) return <div className="weather-card">날씨 정보를 불러오는 중...</div>;

    // 필요한 데이터 필터링
    const temperature = weather.main?.temp; // 온도
    const humidity = weather.main?.humidity; // 습도
    const windSpeed = weather.wind?.speed; // 풍속
    const weatherMain = weather.weather[0]?.main; // 날씨 상태


    // 회전할 데이터 목록 (온도, 습도, 풍속)
    const data = [
        { label: "온도", value: `${temperature}°C` },
        { label: "습도", value: `${humidity}%` },
        { label: "풍속", value: `${windSpeed} km/h` }
    ];

    return (
        <div className="weather-card">
            <div className="weather-icon">
                {renderWeatherIcon(weatherMain)}
            </div>
            <div className="weather-data">
                <p>{data[currentIndex].label} : {data[currentIndex].value}</p>
            </div>
        </div>
    );
};

export default WeatherCard;

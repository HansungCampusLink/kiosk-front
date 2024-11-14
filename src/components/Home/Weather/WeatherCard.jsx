// WeatherCard.jsx
import React, { useEffect, useState } from 'react';
import './WeatherCard.css';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // 성북구 한성대 근처 위도와 경도 설정
        const lat = 37.5894; // 한성대 근처 위도
        const lon = 127.0294; // 한성대 근처 경도


        // 실시간 날씨 정보를 가져오는 함수 정의
        const fetchWeather = async () => {
            try {
                // wttr.in API에 서울 지역 날씨 요청을 보냅니다 (JSON 형식으로 반환)
                const response = await fetch(`/weather-api/${lat},${lon}?format=j1`);
                const data = await response.json(); // JSON 형식으로 변환

                // 응답 데이터에서 현재 날씨 정보 추출
                setWeather(data.current_condition ? data.current_condition[0] : data.weather[0].hourly[0]); // current_condition이 없으면 hourly 데이터를 사용
            } catch (error) {
                setError("네트워크 오류로 날씨 정보를 불러오지 못했습니다.");
            }
        };

        // 즉시 실행
        fetchWeather();
    }, []);

    const renderWeatherIcon = (weatherDesc) => {
        if (weatherDesc.includes("rain")) return <WiRain />;
        if (weatherDesc.includes("snow")) return <WiSnow />;
        if (weatherDesc.includes("thunder")) return <WiThunderstorm />;
        return <WiDaySunny />;
    };


    // 5초마다 온도, 습도, 풍속이 회전하는 애니메이션 설정
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 6000); // 5초마다 변경
        return () => clearInterval(interval);
    }, []);



    if (error) return <div className="weather-card">오류: {error}</div>;
    if (!weather) return <div className="weather-card">날씨 정보를 불러오는 중...</div>;

    const temperature = weather.temp_C || weather.tempC; // 온도
    const humidity = weather.humidity || weather.humidity_percent; // 습도
    const windSpeed = weather.windspeedKmph || weather.wind_speed; // 풍속
    const weatherDesc = weather.weatherDesc ? weather.weatherDesc[0].value.toLowerCase() : "clear"; // 날씨 상태 설명

    // 회전할 데이터 목록 (온도, 습도, 풍속)
    const data = [
        { label: "온도", value: `${temperature}°C` },
        { label: "습도", value: `${humidity}%` },
        { label: "풍속", value: `${windSpeed} km/h` }
    ];

    return (
        <div className="weather-card">
            <div className="weather-icon">
                {renderWeatherIcon(weatherDesc)}
            </div>
            <div className="weather-data">
                <p>{data[currentIndex].label} : {data[currentIndex].value}</p>
            </div>
        </div>
    );
};

export default WeatherCard;

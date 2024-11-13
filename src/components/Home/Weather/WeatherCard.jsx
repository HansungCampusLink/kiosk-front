// WeatherCard.jsx
import React, { useEffect, useState } from 'react';
import './WeatherCard.css';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'weather-react-icons';

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // $$$$ 날씨 정보를 기상청 초단기 실황 조회 API를 사용해 가져옵니다
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://apihub.kma.go.kr/api/typ02/openApi/VilageFcstInfoService_2.0/getUltraSrtNcst?pageNo=1&numOfRows=10&dataType=JSON&base_date=20241113&base_time=0600&nx=60&ny=127&authKey=E-S5JcLETQmkuSXCxJ0Jfg`
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

        // 위치 정보 가져오기 및 날씨 데이터 호출
        navigator.geolocation.getCurrentPosition(
            () => {
                fetchWeather(); // 위치 좌표를 사용하는 대신 고정된 좌표 사용
            },
            () => setError("위치 정보를 사용할 수 없습니다.")
        );
    }, []);

    // 날씨 코드에 따른 아이콘 표시 함수
    const renderWeatherIcon = (category) => {
        switch (category) {
            case 'SKY':
                return <WiDaySunny />; // 맑음
            case 'RAIN':
                return <WiRain />; // 비
            case 'SNOW':
                return <WiSnow />; // 눈
            case 'CLOUDY':
                return <WiCloudy />; // 흐림
            case 'THUNDERSTORM':
                return <WiThunderstorm />; // 천둥번개
            default:
                return <WiDaySunny />; // 기본 아이콘
        }
    };

    if (error) return <div className="weather-card">오류: {error}</div>;
    if (!weather) return <div className="weather-card">날씨 정보를 불러오는 중...</div>;


    // 필요한 데이터 필터링
    const temperature = weather.find(item => item.category === 'T1H')?.obsrValue;
    const skyCondition = weather.find(item => item.category === 'SKY')?.obsrValue;
    const rainCondition = weather.find(item => item.category === 'PTY')?.obsrValue;

    return (
        <div className="weather-card">
            <h3>현재 날씨</h3>
            <div className="weather-icon">
                {renderWeatherIcon(skyCondition || rainCondition)}
            </div>
            <p>온도: {temperature}°C</p>
            <p>상태: {skyCondition || rainCondition}</p>
        </div>
    );
};

export default WeatherCard;
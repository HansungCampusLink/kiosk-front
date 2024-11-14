// WeatherCard.jsx
import React, { useEffect, useState } from 'react';
import './WeatherCard.css';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        //현재 날짜 및 시간 설정 예정
        const today = new Date(); // 현재 날짜와 시간을 가져옵니다
        const year = today.getFullYear(); // 현재 연도를 4자리 형식으로 가져옵니다 (예: 2024)
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 현재 월을 2자리 문자열로 변환 (예: 1월은 '01'로 표시)
        const day = String(today.getDate()).padStart(2, '0'); // 현재 일을 2자리 문자열로 변환 (예: 3일은 '03'로 표시)


        // 기상청 API에서 1시간 전의 정시 기준 실황 데이터를 제공하기 때문에 현재 시간에서 1시간을 뺀 시간을 설정합니다
        today.setHours(today.getHours() - 1); // 현재 시간에서 1시간을 빼서 API에서 조회 가능한 가장 최신 데이터 시간으로 설정
        const hours = String(today.getHours()).padStart(2, '0') + "00"; // 시간을 2자리 문자열로 변환하고 '00'을 추가해 정시로 표시 (예: 14시는 '1400')

        // 최종적으로 API 호출 시 사용할 날짜와 시간 형식으로 포맷합니다
        const base_date = `${year}${month}${day}`; // 기상청 API에서 요구하는 날짜 형식 (YYYYMMDD)으로 생성
        const base_time = hours; // 기상청 API에서 요구하는 시간 형식 (HHmm)으로 생성


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


    // 5초마다 온도, 습도, 풍속이 회전하는 애니메이션 설정
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 6000); // 5초마다 변경
        return () => clearInterval(interval);
    }, []);



    if (error) return <div className="weather-card">오류: {error}</div>;
    if (!weather) return <div className="weather-card">날씨 정보를 불러오는 중...</div>;

    // 필요한 데이터 필터링
    const temperature = weather.find(item => item.category === 'T1H')?.obsrValue;
    const humidity = weather.find(item => item.category === 'REH')?.obsrValue;
    const rainCondition = weather.find(item => item.category === 'PTY')?.obsrValue;
    const windSpeed = weather.find(item => item.category === 'WSD')?.obsrValue;

    // 회전할 데이터 목록 (온도, 습도, 풍속)
    const data = [
        { label: "온도", value: `${temperature}°C` },
        { label: "습도", value: `${humidity}%` },
        { label: "풍속", value: `${windSpeed}m/s` }
    ];

    return (
        <div className="weather-card">
            <div className="weather-icon">
                {renderWeatherIcon(rainCondition)}
            </div>
            <div className="weather-data">
                <p>{data[currentIndex].label} : {data[currentIndex].value}</p>
            </div>
        </div>
    );
};

export default WeatherCard;

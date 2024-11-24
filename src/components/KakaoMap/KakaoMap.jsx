import React, {useEffect} from 'react';

const KakaoMap = ({ setQuestion }) => {
    useEffect(() => {

        // 카카오맵 API 스크립트 로드
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=e1354f3fec347c698ee6f8899df6c3eb&libraries=services&autoload=false`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            // 카카오맵 API 로드 확인
            if (window.kakao && window.kakao.maps) {
                // kakao.maps.load를 사용하여 비동기 로드
                window.kakao.maps.load(() => {
                    const container = document.getElementById('kakao-map');
                    const options = {
                        center: new window.kakao.maps.LatLng(37.58240, 127.01105), // 한성대학교 정문 좌표
                        // -> 왼쪽 좌표 커질수록 마커 위?로, 오른쪽 좌표 커질 수록 마커 오른쪽으로
                        level: 3, // 확대 레벨
                    };

                    const map = new window.kakao.maps.Map(container, options);

                    // 세로 가로
                    const buildingLocations = [
                        { name: '정문', lat: 37.58240, lng: 127.01105 }, //
                        { name: '창의관', lat: 37.58215, lng: 127.01080 }, //
                        { name: '인성관', lat: 37.58195, lng: 127.01080 }, //
                        { name: '낙산관', lat: 37.58215, lng: 127.01135 }, //
                        { name: '상상관', lat: 37.58275, lng: 127.01020 }, //
                        { name: '미래관', lat: 37.58253, lng: 127.01070 }, //

                        { name: '우촌관', lat: 37.58309, lng: 127.01063 }, //
                        { name: '진리관', lat: 37.58300, lng: 127.0095 }, //
                        { name: '학송관', lat: 37.58330, lng: 127.009500 }, //
                        { name: '탐구관', lat: 37.58345, lng: 127.00916 }, //
                        { name: '한성 학군단', lat: 37.58330, lng: 127.009 }, //

                        { name: '연구관', lat: 37.58225, lng: 127.00980 }, //
                        { name: '지선관', lat: 37.58210, lng: 127.00980 },
                        { name: '공학관 A동', lat: 37.58180, lng: 127.00990 },
                        { name: '공학관 B동', lat: 37.58155, lng: 127.00960 },
                    ];

                    // 마커 이미지 설정
                    const markerImageUrl = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'; // 커스텀 이미지 URL
                    const markerImageSize = new window.kakao.maps.Size(20, 30); // 마커 크기 설정
                    const markerImage = new window.kakao.maps.MarkerImage(markerImageUrl, markerImageSize);

                    // 마커 및 이벤트 추가
                    buildingLocations.forEach(({ name, lat, lng }) => {
                        const position = new window.kakao.maps.LatLng(lat, lng);
                        const marker = new window.kakao.maps.Marker({
                            position,
                            map,
                            image: markerImage, // 커스텀 마커 이미지 적용
                        });

                        // 인포윈도우 추가
                        const infowindow = new window.kakao.maps.InfoWindow({
                            content: `<div style="padding:5px;">${name}</div>`,
                        });

                        // 마우스오버 및 클릭 이벤트
                        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                            infowindow.open(map, marker); // 마우스오버 시 인포윈도우 열기
                        });

                        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                            infowindow.close(); // 마우스아웃 시 인포윈도우 닫기
                        });

                        window.kakao.maps.event.addListener(marker, 'click', () => {
                            // 마커 클릭 시 토글로 destination 설정
                            setQuestion((prev) => {
                                const newDestination = prev === `${name}까지 가는 방법 알려줘` ? 'Unknown' : `${name}까지 가는 방법 알려줘`;
                                return newDestination;
                            });
                        });
                    });
                });
            } else {
                console.error('Kakao Maps API 로드 실패');
            }
        };

        script.onerror = () => {
            console.error('Kakao Maps 스크립트 로드 실패');
        };

        document.body.appendChild(script); // 스크립트 추가
    }, [setQuestion]);

    return (
        <div className="kakao-map-container">
            <div id="kakao-map" style={{ width: '100%', height: '300px', marginBottom: '20px', borderRadius: '30px' }}></div>

        </div>
    );
};

export default KakaoMap;

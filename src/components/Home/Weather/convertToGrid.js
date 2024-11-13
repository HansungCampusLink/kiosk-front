// convertToGrid.js

// 위도와 경도를 기상청 격자 좌표로 변환하는 함수
export function convertToGrid(latitude, longitude) {
    const RE = 6371.00877;    // 지구 반경(km)
    const GRID = 5.0;         // 격자 간격(km)
    const SLAT1 = 30.0;       // 표준 위도 1(°)
    const SLAT2 = 60.0;       // 표준 위도 2(°)
    const OLON = 126.0;       // 기준점의 경도(°)
    const OLAT = 38.0;        // 기준점의 위도(°)
    const XO = 43;            // 기준점의 X 좌표(GRID)
    const YO = 136;           // 기준점의 Y 좌표(GRID)

    const DEGRAD = Math.PI / 180.0;
    const RADDEG = 180.0 / Math.PI;

    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);
    let ra = Math.tan(Math.PI * 0.25 + latitude * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    let theta = longitude * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;

    const x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    const y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

    return { nx: x, ny: y };
}

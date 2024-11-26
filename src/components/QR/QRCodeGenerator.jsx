// src/components/QR/QRCodeGenerator.jsx

import React from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // QR 코드 생성 라이브러리
import './QRCodeGenerator.css';
import {useSelector} from "react-redux";

const QRCodeGenerator = ({ refLink }) => {
    const theme = useSelector((state) => state.theme.mode); // Redux 상태에서 theme 가져오기

    return (
        <div className="qr-code-container">
            <div className="qr-code-item"> {/* 여백 추가 */}
                <QRCodeCanvas style={{width: 100, height: 100}}
                              value={refLink} // QR 코드에 표시할 링크 값
                              size={200}      // QR 코드 크기
                              level="H"       // 오류 수정 레벨 설정
                />
            </div>
            <button
                onClick={() => window.open(refLink, "_blank", "noopener,noreferrer")}
                className="qr-link-btn"
                aria-label="Go to Link"
            >
                <img
                    src={theme === 'light' ? '/images/icons/link-icon.png' : '/images/icons/link-icon_white.png'}
                    alt="Go to Link Icon"
                    className="link-icon"
                />
            </button>
        </div>
    );
};

export default QRCodeGenerator;

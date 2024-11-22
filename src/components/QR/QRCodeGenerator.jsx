// src/components/QR/QRCodeGenerator.jsx

import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // QR 코드 생성 라이브러리
import './QRCodeGenerator.css';

const QRCodeGenerator = ({ refLink }) => {
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
                    src="/images/link-icon.png"
                    alt="Go to Link Icon"
                    className="link-icon"
                />
            </button>
        </div>
    );
};

export default QRCodeGenerator;

// const QRCodeGenerator = ({ qrCodes }) => {
//     return (
//         <div className="qr-code-container">
//             {qrCodes.map((refLink, index) => (
//                 <div className="qr-code-item" key={index}>
//                     <h3>QR Code</h3>
//                     <QRCodeCanvas
//                         value={refLink} // QR 코드에 표시할 링크 값
//                         size={150}      // QR 코드 크기
//                         level="H"       // 오류 수정 레벨 설정
//                     />
//                     <p>{refLink}</p> {/* QR 코드 아래에 링크 표시 */}
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default QRCodeGenerator;


// // how to use em
//
// import React from 'react';
// import QRCodeGenerator from './QRCodeGenerator';
//
// const App = () => {
//     const exampleRef = 'https://www.example.com';
//
//     return (
//         <div>
//             <QRCodeGenerator refLink={exampleRef} />
//         </div>
//     );
// };
//
// export default App;
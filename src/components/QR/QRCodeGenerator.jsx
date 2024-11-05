// src/components/QR/QRCodeGenerator.jsx

import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // QR 코드 생성 라이브러리

const QRCodeGenerator = ({ refLink }) => {
    const [inputText, setInputText] = useState('');

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h3>QR Code for the Link</h3>
            <div style={{padding: '20px', backgroundColor: 'white'}}> {/* 여백 추가 */}
                <QRCodeCanvas
                    value={refLink} // QR 코드에 표시할 링크 값
                    size={200}      // QR 코드 크기
                    level="H"       // 오류 수정 레벨 설정
                />
            </div>
            <p style={{marginTop: '10px', color: '#333'}}>{refLink}</p> {/* QR 코드 아래에 링크 표시 */}
        </div>
    );
};

export default QRCodeGenerator;


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
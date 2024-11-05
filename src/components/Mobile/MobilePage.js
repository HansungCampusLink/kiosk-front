// src/components/Mobile/MobilePage.js
import React from 'react';

const MobilePage = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
        }}>
            <header style={{ marginBottom: '20px' }}>
                <h1>한성대 키오스크 모바일 화면 테스트 </h1>
            </header>
            <section>
                <p style={{ fontSize: '16px', color: '#333' }}>
                    이 페이지는 한성대 관련 키오스크 테스트 페이지 입니다 . QR 코드 혹은 링크를 통해 모바일 환경에서 접근하신 것입니다.
                </p>
                <p style={{ fontSize: '14px', color: '#555', marginTop: '15px' }}>
                    "학교 어떻게 갈까?"와 같은 질문에 대한 자세한 정보를 이 페이지에서 추후 개발이 완료되면 편하게 확인하실 수 있습니다.
                </p>
            </section>
            <footer style={{ marginTop: '30px', fontSize: '12px', color: '#888' }}>
                <p>한성대학교 © 2024. 모든 권리 보유하등가 말등가 잘 모름 .</p>
            </footer>
        </div>
    );
};

export default MobilePage;

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/v1', // 프록시 경로 설정 (API 요청 경로)
        createProxyMiddleware({
            target: 'https://hansung.store/api/v1', // 백엔드 서버의 기본 주소
            changeOrigin: true,

        })
    );
};


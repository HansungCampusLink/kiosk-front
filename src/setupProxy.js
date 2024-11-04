const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api', // 프록시 경로 설정 (API 요청 경로)
        createProxyMiddleware({
            target: 'https://hansung.store', // 백엔드 서버의 기본 주소
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api/v1', // /api로 시작하는 경로를 /api/v1로 변경
            },
        })
    );
};


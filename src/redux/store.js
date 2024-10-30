// store.js
import { configureStore } from '@reduxjs/toolkit'; // configureStore 임포트
import chatReducer from './chatSlice'; // chatReducer를 chatSlice에서 임포트

// Redux 스토어 생성
const store = configureStore({
    reducer: {
        chat: chatReducer, // chatReducer 등록
    },
});

export default store; // 스토어 내보내기

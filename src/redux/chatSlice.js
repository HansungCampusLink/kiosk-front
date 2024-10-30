// chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 초기 상태 설정
const initialState = {
    messages: [],
};

// 비동기 thunk 액션 생성
export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (content, { dispatch }) => {
        dispatch({ type: 'chat/sendMessage', payload: { role: 'user', content } });

        // API 요청
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content }],
                stream: true,
            }),
        });
        const data = await response.json();

        // 수신된 메시지 디스패치
        return { role: 'assistant', content: data.message.content, ref: data.ref };
    }
);

// 슬라이스 생성
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            state.messages.push(action.payload); // 사용자 메시지 추가
        },
        receiveMessage: (state, action) => {
            state.messages.push(action.payload); // 수신된 메시지 추가
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload); // 비동기 요청 성공 시 수신된 메시지 추가
        });
    },
});

// 리듀서와 액션 내보내기
export const { receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 설정
const initialState = {
    mode: 'dark', // 기본값: 'dark'
};

// Slice 생성
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'; // 라이트/다크 토글
        },
        setTheme: (state, action) => {
            state.mode = action.payload; // 특정 모드로 설정
        },
    },
});

// 액션과 리듀서 내보내기
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

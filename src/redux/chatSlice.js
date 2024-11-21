import { createSlice } from '@reduxjs/toolkit';
import { updateUrlWithChatId, } from './utils/urlUtils';

// 초기 상태 설정
const initialState = {
    chatId: null, // 새로운 chatId 추가
    who: "student",
    major: null,
    messages: [],
    loading: false
};

// 비동기 액션 정의
export const sendUserMessage = (requestData) => {
    return async (dispatch, getState) => {
        const state = getState();
        const chatId = state.chat.chatId; // Redux 상태에서 chatId 가져오기

        // 배열의 마지막 메시지를 전송하는 액션을 디스패치
        const latestMessage = requestData.messages[requestData.messages.length - 1]; // 최신 메시지
        dispatch(sendMessage({ role: latestMessage.role, content: latestMessage.content })); // 최신 메시지를 디스패치

        try {
            const state = getState();
            const chatId = state.chat.chatId; // 기존 chatId 확인

            // chatId 유무에 따라 요청 본문 구성
            const requestBody = chatId
                ? { chatId,
                    who: requestData.who || "student", // 테스트
                    major: requestData.major || null, // 테스트
                    messages: requestData.messages } // chatId와 메시지 포함
                : {
                    who: requestData.who || "student",
                    major: requestData.major || null,
                    messages: requestData.messages,
                }; // chatId가 없으면 기본 요청 구성


            // API 요청
            const response = await fetch(`/api/v1/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody), // 요청 본문
            });

            console.log('Made request:', requestData.messages);

            // 서버의 응답이 성공적인지 확인
            if (!response.ok) { // 응답이 성공적이지 않은 경우 오류 처리
                throw new Error('네트워크 응답이 올바르지 않습니다.'); // 오류 메시지
            }

            const data = await response.json(); // JSON 형태로 응답 데이터 파싱
            console.log('Received response:', data); // API 응답 로그 출력

            // 새 chatId를 받은 경우 Redux 상태 및 URL 업데이트
            if (!chatId && data.chatId) {
                const chatIdString = String(data.chatId); // chatId를 문자열로 변환
                dispatch(setChatId(chatIdString));
                updateUrlWithChatId(chatIdString); // URL에 chatId 추가
            }

            // AI의 응답 메시지를 Redux 스토어에 저장
            dispatch(receiveMessage({
                role: data.messages.role,
                content: data.messages.content,
                ref: data.ref,
            }));
        } catch (error) {
            console.error('Error sending message:', error); // 오류 로그 출력
        }
    };
};



// 비동기 히스토리 불러오기 액션
export const fetchChatHistoryById = (chatId) => {
    return async (dispatch) => {
        if (!chatId || typeof chatId !== 'string') {
            console.error('Invalid chatId for history fetch:', chatId); // 잘못된 chatId 처리
            return;
        }

        try {
            // API 요청: 히스토리 가져오기
            const response = await fetch(`/api/v1/history/${chatId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch chat history'); // 응답 실패 처리
            }

            const data = await response.json(); // JSON 파싱
            dispatch(setMessages(data.messages)); // 메시지 설정
        } catch (error) {
            console.error('Error fetching chat history:', error); // 오류 로그 출력
        }
    };
};




// 슬라이스 생성
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatId: (state, action) => {
            state.chatId = action.payload; // chatId 설정
        },
        // 사용자 메시지를 Redux 스토어에 추가하는 리듀서
        sendMessage: (state, action) => {
            state.messages.push(action.payload); // 사용자 메시지 추가
            state.loading = true; // 사용자가 메시지를 보낼 때 로딩 시작

        },
        // AI 응답을 Redux 스토어에 추가하는 리듀서
        receiveMessage: (state, action) => {
            const { role, content, ref } = action.payload;
            state.messages.push({ role, content, ref }); // 수신된 AI 응답 메시지 추가
            state.loading = false; // 어시스턴트 응답 시 로딩 중지

        },
        // URL에서 메시지 복원하는 리듀서 추가
        restoreMessagesFromUrl: (state, action) => {
            state.messages = action.payload; // URL에서 복원된 메시지를 설정
        },
        resetMessages: (state) => {
            state.chatId = null; // chatId 초기화
            state.messages = []; // 메시지 초기화
            state.loading = false; // 로딩 상태 초기화
        },
        setMessages: (state, action) => {
            state.messages = action.payload; // 히스토리 불러오기
        },
    },
});

// 액션과 리듀서 내보내기
export const { setChatId, sendMessage, receiveMessage, setMessages,restoreMessagesFromUrl, resetMessages } = chatSlice.actions; // 사용자 메시지 및 AI 응답 디스패치 액션 내보내기
export default chatSlice.reducer; // 슬라이스 리듀서 내보내기

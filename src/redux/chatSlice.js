import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 설정
const initialState = {
    who: "student",
    major: null,
    messages: [],
    loading: false
};

// 비동기 액션 정의
export const sendUserMessage = (requestData) => {
    return async (dispatch) => {
        // 배열의 마지막 메시지를 전송하는 액션을 디스패치
        const latestMessage = requestData.messages[requestData.messages.length - 1]; // 최신 메시지
        dispatch(sendMessage({ role: latestMessage.role, content: latestMessage.content })); // 최신 메시지를 디스패치
        try {
            // API 요청
            const response = await fetch(`/api/v1/chat`, {
                method: 'POST', // HTTP 메소드 POST 사용
                headers: { 'Content-Type': 'application/json' }, // 요청 헤더 설정
                body: JSON.stringify({
                    who: requestData.who || "student",  // who가 없으면 기본값 'student'
                    major: requestData.major || null, // major가 없으면 기본값 null
                    // messages : [{ role: 'user', content: requestData.messages[0].content }], // 메시지 배열에 사용자 메시지 추가
                    messages: requestData.messages // 모든 메시지를 요청에 포함 하는 버전의 messages
                    // stream: true, // 스트리밍 요청 여부
                }),
            });

            console.log('Made request:', requestData.messages);

            // 서버의 응답이 성공적인지 확인
            if (!response.ok) { // 응답이 성공적이지 않은 경우 오류 처리
                throw new Error('네트워크 응답이 올바르지 않습니다.'); // 오류 메시지
            }

            const data = await response.json(); // JSON 형태로 응답 데이터 파싱
            console.log('Received response:', data); // API 응답 로그 출력

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

// 슬라이스 생성
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
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
    },
});

// 액션과 리듀서 내보내기
export const { sendMessage, receiveMessage } = chatSlice.actions; // 사용자 메시지 및 AI 응답 디스패치 액션 내보내기
export default chatSlice.reducer; // 슬라이스 리듀서 내보내기

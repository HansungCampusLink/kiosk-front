import { createSlice } from '@reduxjs/toolkit';
import { updateUrlWithChatId, } from './utils/urlUtils';

// 초기 상태 설정
const initialState = {
    chatId: null, // 새로운 chatId 추가
    who: "student",
    major: "Unknown",
    openAi: true, // 추가: OpenAI 버튼 상태
    messages: [],
    loading: false
};

// 비동기 액션 정의
export const sendUserMessage = (requestData) => {
    return async (dispatch, getState) => {
        const state = getState();
        const chatId = state.chat.chatId; // 기존 chatId 확인
        const isOpenAI = state.chat.openAi; // Redux에서 OpenAI 상태 가져오기


        // 배열의 마지막 메시지를 전송하는 액션을 디스패치
        const latestMessage = requestData.messages[requestData.messages.length - 1]; // 최신 메시지
        dispatch(sendMessage({ role: latestMessage.role, content: latestMessage.content })); // 최신 메시지를 디스패치

        try {
            // chatId 유무에 따라 요청 본문 구성
            const requestBody = chatId
                ? { chatId,
                    who: requestData.who || "student", // 테스트
                    major: requestData.major || "Unknown", // 테스트
                    openAi: isOpenAI, // 추가: OpenAI 상태 포함
                    messages: requestData.messages } // chatId와 메시지 포함
                : {
                    who: requestData.who || "student",
                    major: requestData.major || "Unknown",
                    openAi: isOpenAI, // 추가: OpenAI 상태 포함
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
                content: data.messages.content,
                destination: data.messages.destination, // destination 명시적으로 전달
                ref: data.messages.ref,
                role: data.messages.role,
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

            // 복원된 메시지를 순서대로 Redux 스토어에 저장
            const sortedMessages = data.messages.sort((a, b) => a.timestamp - b.timestamp); // 타임스탬프로 정렬
            dispatch(setMessages(sortedMessages)); // Redux 상태 업데이트
        } catch (error) {
            console.error('Error fetching chat history:', error); // 오류 로그 출력
        }
    };
};

const buildingImageMap = {
    '정문': '/images/maps/main_gate.png',
    '창의관': '/images/maps/creative_building.png',
    '인성관': '/images/maps/integrity_building.png',
    '낙산관': '/images/maps/naksan_building.png',
    '상상관': '/images/maps/imagination_building.png',
    '미래관': '/images/maps/future_building.png',

    '우촌관': '/images/maps/uchon_building.png',
    '진리관': '/images/maps/truth_building.png',
    '학송관': '/images/maps/haksong_building.png',
    '탐구관': '/images/maps/exploration_building.png',
    '한성 학군단': '/images/maps/hansung_rotc.png',

    '연구관': '/images/maps/research_building.png',
    '지선관': '/images/maps/jiseon_building.png',
    '공학관 에이동': '/images/maps/engineering_a.png',
    '공학관 비동': '/images/maps/engineering_b.png',
    '상상빌리지': '/images/maps/Imagination_Village.png',

    // ... 건물 추가시 ...
};


// 슬라이스 생성
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatId: (state, action) => {
            state.chatId = action.payload; // chatId 설정
        },
        setOpenAi: (state, action) => {
            state.openAi = action.payload; // OpenAI 상태 설정
        },
        // 사용자 메시지를 Redux 스토어에 추가하는 리듀서
        sendMessage: (state, action) => {
            state.messages.push(action.payload); // 사용자 메시지 추가
            state.loading = true; // 사용자가 메시지를 보낼 때 로딩 시작

        },
        // AI 응답을 Redux 스토어에 추가하는 리듀서
        receiveMessage: (state, action) => {
            const { content, destination, ref, role, } = action.payload;


            // 메시지에 destination이 없더라도 별도로 처리
            const destinationImage = destination ? buildingImageMap[destination] : "Unknown";

            // // 디버깅 로그 추가
            // console.log("Destination:", destination);
            // console.log("Image Path:", destination ? buildingImageMap[destination] : null);

            // 메시지로 처리
                state.messages.push({
                    role,
                    content, // 실제 텍스트
                    ref,
                    destination, // 목적지
                    image: destinationImage, // 목적지 이미지

                });



            state.loading = false; // 어시스턴트 응답 시 로딩 중지

        },
        // URL에서 메시지 복원하는 리듀서 추가
        restoreMessagesFromUrl: (state, action) => {
            state.messages = action.payload; // URL에서 복원된 메시지를 설정
        },
        resetMessages: (state) => {
            state.chatId = null; // chatId 초기화
            state.messages = []; // 메시지 초기화
            state.openAI = true; // 상태 초기화
            state.loading = false; // 로딩 상태 초기화
        },
        setMessages: (state, action) => {

            const newMessages = action.payload;

            // 새로운 메시지에 destination에 따른 이미지 매핑 추가
            const updatedMessages = newMessages.map((msg) => {
                if (msg.destination) {
                    const destinationImage = buildingImageMap[msg.destination] || "Unknown";
                    return {
                        ...msg,
                        image: destinationImage, // 목적지 이미지 추가
                    };
                }
                return msg;
            });



            state.messages = [
                ...state.messages,
                ...updatedMessages.filter(
                    (newMsg) => !state.messages.some(
                        (existingMsg) =>
                            existingMsg.content === newMsg.content &&
                            existingMsg.role === newMsg.role
                    )
                ),
            ];
        },
    },
});

// 액션과 리듀서 내보내기
export const { setChatId, setOpenAi,sendMessage, receiveMessage, setMessages,restoreMessagesFromUrl, resetMessages } = chatSlice.actions; // 사용자 메시지 및 AI 응답 디스패치 액션 내보내기
export default chatSlice.reducer; // 슬라이스 리듀서 내보내기

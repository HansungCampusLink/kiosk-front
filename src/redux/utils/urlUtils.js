
export const updateUrlWithChatId = (chatId) => {
    if (!chatId || typeof chatId !== 'string') {
        console.error('Invalid chatId:', chatId); // 잘못된 chatId 처리
        return;
    }

    // chatId를 문자열로 처리
    const newUrl = `${window.location.origin}?chatId=${encodeURIComponent(chatId)}`;
    window.history.replaceState(null, '', newUrl);
};


export const parseChatIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('chatId'); // chatId가 URL에 존재하면 반환, 없으면 null 반환
};





export const updateUrlWithMessages = (messages) => {
    const queryParams = messages
        .map((msg, index) => `msg${index}=${encodeURIComponent(msg.role + ':' + msg.content)}`)
        .join('&');
    const newUrl = `${window.location.origin}?${queryParams}`;
    window.history.replaceState(null, '', newUrl);
};


export const parseMessagesFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const messages = [];
    for (const [key, value] of params.entries()) {
        if (key.startsWith('msg')) {
            messages.push({
                content: decodeURIComponent(value),
                role: key.includes('assistant') ? 'assistant' : 'user', // 기본적으로 user로 설정
            });
        }
    }
    return messages;
};
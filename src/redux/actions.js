export const sendMessage = (content) => {
    return async (dispatch) => {
        dispatch({ type: 'SEND_MESSAGE', payload: { role: 'user', content } });

        // API 요청 시뮬레이션
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content }],
                stream: true,
            }),
        });
        const data = await response.json();

        dispatch({
            type: 'RECEIVE_MESSAGE',
            payload: { role: 'assistant', content: data.message.content, ref: data.ref }
        });
    };
};

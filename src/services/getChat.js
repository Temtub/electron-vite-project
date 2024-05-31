

export const getChat = async () =>{

    const response = await restful('POST', 'http://localhost:3001/api/chat/chats');
} 
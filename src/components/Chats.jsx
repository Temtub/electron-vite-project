import { useEffect, useState } from 'react';
import { restful } from '/restApi/index.js';

import ChatBox from './ChatBox';
import { resolveConfig } from 'vite';

function Chats({ data }) {
    const [chatsData, setChatsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (data && data.length > 0) {
                try {
                    const response = await restful('POST', 'http://localhost:3001/api/chat/chats', { chats: data });
                    console.log(response)
                    setChatsData(response);
                    
                } catch (error) {
                    console.error('Error fetching chats data:', error);
                }
            }
        };

        fetchData();
    }, []);

    const renderChat = (chat) => {
        if (chatsData.length === 0) {
            return <div>Empty</div>;
        }
        return <ChatBox key={chat._id} id={chat._id} />
    };
    
    return (
        <aside className="chats">

        {chatsData && chatsData.map(chat => (
            renderChat(chat)
        ))}
        </aside>
    );
}

export default Chats;

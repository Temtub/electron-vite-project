import { useEffect, useState } from 'react';
import { restful } from '/restApi/index.js';
import FriendBox from './ChatBox';

function Friends({ data }) {
    const [chatsData, setChatsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (data && data.length > 0) {
                try {
                    const response = await restful('POST', 'http://localhost:3001/api/chat/chats', { chats: data });
                    console.log(response)
                    setChatsData(response);
                    console.log(chatsData)
                } catch (error) {
                    console.error('Error fetching chats data:', error);
                }
            }
        };

        fetchData();
    }, []);

    const renderChats = () => {
        if (chatsData.length === 0) {
            return <div>Empty</div>;
        }

        return chatsData.map(chat => (
            <FriendBox key={chat._id} id={chat._id} />
        ));
    };

    return (
        <aside className="chats">
            {renderChats()}
        </aside>
    );
}

export default Friends;

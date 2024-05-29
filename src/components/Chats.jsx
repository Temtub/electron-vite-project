import { useEffect, useState } from 'react';
import { restful } from '/restApi/index.js';
import ChatBox from './ChatBox';
import { useCheckSession } from '../services/hooks/useCheckSession';

function Chats({ data }) {
    const userData = useCheckSession()
    const [chatsData, setChatsData] = useState([]);
    const [error, setError] = useState("");

    // Fetch the data from the bd
    useEffect(() => {
        /**
         * Function to fetch the data
         */
        const fetchData = async () => {
            if (data && data.length > 0) {
                try {
                    const response = await restful('POST', 'http://localhost:3001/api/chat/chats', { chats: data });

                    if (response.hasOwnProperty('status') && response.status === false) {
                        setError(response.msg);
                    } else {
                        setChatsData(response);
                    }
                } catch (err) {
                    console.error('Error fetching chats data:', err);
                    setError('Error fetching chats data.');
                }
            }
        };

        fetchData();
    }, [data]);

    return (
        <aside className="chats">
            <div>

                {/* If theres no data it shows it, if theres no also and if alls correct dont show it */}
                {error ? (
                    <div className="error">{error}</div>
                ) : (
                    chatsData.length === 0 ? (
                        <div>Empty</div>
                    ) : (
                        chatsData.map(chat => <ChatBox key={chat._id} name={chat.name} users={chat.users} id={chat._id} friends={userData.data.friends}/>)
                    )
                )}
            </div>
        </aside>
    );
}

export default Chats;

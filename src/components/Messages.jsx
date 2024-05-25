import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { useCheckSession } from '../services/hooks/useCheckSession';
import { getNewChat } from '../services/getNewChat';

import ChargingChats from './ChargingChats';
import Chats from './Chats';
import { restful } from "/restApi"
import { useEffect, useState } from 'react';
let token;
function Messages() {


  const token = useCheckSession();
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null);
  const [newChat, setNewChat] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const chargeMessages = async () => {
      if (token) {
        try {
          let response = await restful("GET", `http://localhost:3001/api/user/${token.data.id}`);
          setUserData(response);
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      }
    };

    chargeMessages();
  }, [token]);


  const searchNewChat = async () => {
    if (userData) {
      setLoading(true);
      const response = await getNewChat(userData._id);
      setLoading(false);
      navigate(`/chat/${response._id}`);
    }
  };


  return (
    <div className='messages'>

      <aside className='ps-1 d-flex flex-column align-items-start'>
        <h2>Chats</h2>
        <button title='Añade un nuevo chat' className='serchChatButton' disabled={loading ? true : false} onClick={searchNewChat}>{loading ? 'Buscando...' : <i className="fa-solid fa-plus"></i>}</button>
        {/* If the data of the chats of the user is filled then show it else show that it is charging */}
        {userData ? <Chats data={userData.chats}></Chats> : <ChargingChats />}
      </aside>

      <Outlet></Outlet>
    </div>
  );
}

export default Messages;

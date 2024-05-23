import { Outlet } from 'react-router';

import { useCheckSession } from '../services/hooks/useCheckSession';
import { getNewChat } from '../services/getNewChat';

import ChargingChats from './ChargingChats';
import Friends from './Chats';
import { restful } from "/restApi"
import { useEffect, useState } from 'react';
let token;

function Messages () {
 
  const token = useCheckSession();
  const [userData, setUserData] = useState(null);
  const [newChat, setNewChat] = useState("")
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
    // let newChat = useGetNewChat(user)
    // console.log(userData)
    let newChat
    ( userData ?  newChat = await getNewChat(userData._id) : false)
    setNewChat(newChat)
    console.log(newChat)
  }

  

  return (
    <div className='messages'>
      <aside>
        <button onClick={searchNewChat}>Buscar persona</button>
      {/* If the data of the chats of the user is filled then show it else show that it is charging */}
      { userData ? <Friends data={userData.chats}></Friends> : <ChargingChats/> }
      </aside>
      
      <Outlet></Outlet>
    </div>
  );
}

export default Messages;

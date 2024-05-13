import { Outlet } from 'react-router';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

//Import the hook to get the user data 
import { useGetUserById } from '../services/hooks/useGetUserById';

import ChargingChats from './ChargingChats';
import Friends from './Friends';

function Messages() {
  //Get the id param
  let userId = useParams().idUserParam

  // Get the data from the by BD by the hook
  const userData = useGetUserById(userId)

  return (
    <div className='messages'>
      
      {/* If the data of the chats of the user is filled then show it else show that is charging */}
      { userData ? <Friends data={userData.friends}></Friends> : <ChargingChats/> }
      
      <Outlet></Outlet>
    </div>
  );
}

export default Messages;

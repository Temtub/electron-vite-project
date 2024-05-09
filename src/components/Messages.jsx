import { Outlet } from 'react-router';
import { useParams } from 'react-router-dom';
import { useState } from 'react';


function Messages() {


  return (
    <div className='messages'>
      <h1>Hola</h1>
      
      <Outlet></Outlet>
    </div>
  );
}

export default Messages;

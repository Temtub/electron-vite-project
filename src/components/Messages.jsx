import { Outlet } from 'react-router';

function Messages() {

    return (
      <div className='messages'>
        <h1>Hola</h1>
        <Outlet></Outlet>
          
      </div>
    );
  }
  
  export default Messages;
  
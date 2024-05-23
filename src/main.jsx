import React from 'react'
import ReactDOM from 'react-dom/client'

//Import the class that we will need to Route the page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Import the css
import './styles/login.css'
import './styles/index.css'

//Import the components (as you can see the route is from Components thanks to the configuration we made in tsconfig.json)
import Messages from 'Components/Messages';
import Chat from "Components/Chat"
import DefaultChatBox from 'Components/DefaultChatBox';
import Login from 'Components/Login/Login';
import Register from 'Components/Register/Form';

ReactDOM.createRoot(document.getElementById('root') ).render(
  <React.StrictMode>

    {/* The router */}
    <Router>
      {/* Routes of the page */}
      <Routes>

        {/* Login */}
        <Route index path='/' element= { <Login/> }></Route>  
        {/* Register */}
        <Route path='/register' element= { <Register></Register>}></Route>

        {/* Main route of the page that will contain all the users*/}
        <Route path="/chat" element={ <Messages></Messages> }>   
        
          {/* The message that will show if theres no chat selected */}
          <Route index path='/chat' element= { <DefaultChatBox></DefaultChatBox> }></Route>       
          
          {/* Here will go the chats of the specific user */}
          <Route path='/chat/:' element= { <Chat></Chat> }></Route>       
          
        </Route>

      </Routes>
    </Router>

  </React.StrictMode>
)


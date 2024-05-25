import React from 'react'
import ReactDOM from 'react-dom/client'

//Import the class that we will need to Route the page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Import the css
import './styles/login.css'
import './styles/index.css'
import './styles/chats.css'

//Import the components (as you can see the route is from Components thanks to the configuration we made in tsconfig.json)
import Messages from 'Components/Messages';
import Chat from "Components/Chat"
import DefaultChatBox from 'Components/DefaultChatBox';
import Login from 'Components/Login/Login';
import Register from 'Components/Register/Form';
import Layout from 'Components/Layouts/Layout';
import Navbar from 'Components/Layouts/Navbar';


ReactDOM.createRoot(document.getElementById('root') ).render(
  <React.StrictMode>

    {/* The router */}
    <Router>
      <Routes>
        {/* Login */}
        <Route index path='/' element={ <Login /> } />
        
        {/* Register */}
        <Route path='/register' element={ <Register /> } />
        
        {/* Main route of the page that will contain the navbar */}
        <Route path="/" element={ <Layout /> }>
          {/* Main route for the chat */}
          <Route path="/chat" element={ <Messages /> }>
            {/* The message that will show if there's no chat selected */}
            <Route index element={ <DefaultChatBox /> } />
            
            {/* Chats of the specific user */}
            <Route path=":idChatParam" element={ <Chat /> } />
          </Route>
        </Route>
      </Routes>
    </Router>

  </React.StrictMode>
)


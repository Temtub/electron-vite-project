import React from 'react'
import ReactDOM from 'react-dom/client'

//Import the class that we will need to Route the page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Import the css
import './styles/login.css'
import './styles/index.css'
import './styles/chats.css'
import './styles/navbar.css'
import './styles/groups.css'

//Import the components (as you can see the route is from Components thanks to the configuration we made in tsconfig.json)
import Messages from 'Components/Messages';
import Chat from "Components/Chat"
import DefaultChatBox from 'Components/DefaultChatBox';
import Login from 'Components/Login/Login';
import Register from 'Components/Register/Form';
import Layout from 'Components/Layouts/Layout';
import Navbar from 'Components/Layouts/Navbar';
import { Preferences } from 'Components/Register/Preferences';

import styled, { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from './styles/ThemeContext';
import { ViewGroups } from 'Components/Groups/ViewGroups';
import { CreateGroup } from 'Components/Groups/CreateGroup';
import { ErrorProvider } from 'Components/Context/ErrorContext';
// import { XmppProvider } from 'Components/Context/XmppContext';
// const GlobalStyle = createGlobalStyle`
//   body {
//     background-color: ${(props) => props.theme.background};
//     color: ${(props) => props.theme.color};
//     transition: all 0.5s ease;
//   }
// `;

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      {/* Error provider to pass the message of error between components */}
        {/* <XmppProvider> */}

          {/* The router */}
          <Router>
            <Routes>
              {/* Login */}
              <Route index path='/' element={<Login />} />
              <Route index path='/:msg' element={<Login />} />

              {/* Register */}
              <Route path='/register' element={<Register />} />
              <Route path='/preferences/:userId' element={<Preferences />} />


              {/* Main route of the page that will contain the navbar */}
              <Route path="/" element={<Layout />}>
                {/* Main route for the chat */}
                <Route path="/chat" element={<Messages />}>
                  {/* The message that will show if there's no chat selected */}
                  <Route index element={<DefaultChatBox />} />

                  {/* Chats of the specific user */}
                  <Route path=":idChatParam" element={<Chat />} />

                </Route>
                <Route path="/group" element={<ViewGroups />} />
                <Route path="/createGroup" element={<CreateGroup />} />
              </Route>

            </Routes>
          </Router>
        {/* </XmppProvider> */}
    </ThemeProvider>
  </React.StrictMode>
)


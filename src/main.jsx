import React from 'react'
import ReactDOM from 'react-dom/client'

//Import the class that we will need to Route the page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Import the css
import './index.css'

//Import the components (as you can see the route is from Components thanks to the configuration we made in tsconfig.json)
import Messages from 'Components/Messages';
import Chat from "Components/Chat"

ReactDOM.createRoot(document.getElementById('root') ).render(
  <React.StrictMode>

    {/* The router */}
    <Router>
      {/* Routes of the page */}
      <Routes>

        {/* Main route of the page that will contain all the users*/}
        <Route path="/" element={ <Messages></Messages> }>   
          
          {/* Here will go the chats of the specific user */}
          <Route path=':idUser' element= { <Chat></Chat> }></Route>       
          
        </Route>

      </Routes>
    </Router>

  </React.StrictMode>
)


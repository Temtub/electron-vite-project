import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//Import the components that we will need
import Message from "Components/Message";//Box for a single message
import { getUserDataByToken } from '../services/getUserDataByToken';
import { restful } from "/restApi/index.js"

function Chat() {

  const userToken = localStorage.getItem("token")
  //Get the id of the user you want to show the chat from the url
  const { idChatParam } = useParams()
  const navigate = useNavigate();

  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [userIdState, setUserIdState] = useState("")

  //Clear the chat history when changing the chat 
  useEffect(() => {
    setChatHistory([])

    const chargeUserData = async () =>{
      let userdata = await getUserDataByToken(userToken)
      // If the token checking is false means that the user has been disconnected
      if (!userdata.status) {
        console.log("Reenviado")
        return navigate('/');
      }
  
      // Create the data for the message we going to create
      let userId = userdata.data.data.id
      setUserIdState(userId)

    }
    const getChats = async (chatId) => {
      let response = await restful("GET", "http://localhost:3001/api/chat/" + chatId)
      setChatHistory(response.data.messages)
    }

    chargeUserData()
    getChats(idChatParam)

  }, [idChatParam])


  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (inputText.trim() !== '') {
  
      // Save the moment in which the message has been sent
      let instantMoment = new Date()

      const data = {
        time: instantMoment,
        message: inputText,
        chatId: idChatParam,
        userId: userIdState
      }
  
      let response = await restful("POST", "http://localhost:3001/api/chat/newMessage", data)
  
      setChatHistory(prevChatHistory => {
        const updatedChatHistory = [...prevChatHistory, response];
        return updatedChatHistory;
      });
  
      setInputText('');
    }
  };

  return (
    <div className='chat'>

      <div className="chat__history">
        {chatHistory && chatHistory.map((message, index) => (
          <Message key={(message._id ? message._id : index)} actualUser={userIdState} sender={message.sender} text={message.content}></Message>
        ))}
      </div>

      <form onSubmit={handleSubmit} className='chat__submit'>
        <input
          className='chat__submitInput'
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Escribe un mensaje..."
        />

        <button className='chat__sendButton' type="submit">
          <i className="fa-solid fa-paper-plane"></i>
        </button>

      </form>

    </div>
  );
}

export default Chat;

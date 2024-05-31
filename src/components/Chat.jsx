import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Message from "Components/Message";
import { getUserDataByToken } from '../services/getUserDataByToken';
import { restful } from "/restApi/index.js"
import { Container, Row, Col, Button } from 'react-bootstrap';

function Chat() {
  const userToken = localStorage.getItem("token");
  const { idChatParam } = useParams();
  const navigate = useNavigate();
  const chatHistoryRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [userIdState, setUserIdState] = useState("");
  const [userDataState, setUserDataState] = useState({});
  const [chatData, setChatData] = useState({});
  const [friendName, setFriendName] = useState("");

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const userdata = await getUserDataByToken(userToken);
        if (!userdata.status) {
          console.log("Reenviado");
          return navigate('/Se ha cerrado sesión automaticamente');
        }

        const userId = userdata.data.data.id;
        setUserIdState(userId);
        setUserDataState(userdata);

        const chatResponse = await restful("GET", `http://localhost:3001/api/chat/getChat/${idChatParam}`);
        setChatData(chatResponse);
        setChatHistory(chatResponse.data.messages);

        const friendId = chatResponse.data.users.find(id => id !== userId);
        const friendResponse = await restful("GET", `http://localhost:3001/api/user/${friendId}`);
        setFriendName(friendResponse.name);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initializeChat();
  }, [idChatParam, navigate, userToken]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    chatHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputText.trim() !== '') {
      const instantMoment = new Date();
      const data = {
        time: instantMoment,
        message: inputText,
        chatId: idChatParam,
        userId: userIdState
      };

      try {
        const response = await restful("POST", "http://localhost:3001/api/chat/newMessage", data);
        const newMessage = {
          _id: response._id, 
          sender: userIdState,
          content: inputText,
          time: instantMoment
        };
        setChatHistory(prevChatHistory => [...prevChatHistory, newMessage]);
        setInputText('');
      } catch (error) {
        console .error("Error sending message:", error);
      }
    }
  };

  const handleBackToChats = () => {
    navigate("/chat");
  };

  console.log(chatHistory)
  return (
    <div className='chat'>
      <div className='d-flex flex-row justify-content-between'>
        <div className='d-flex flex-row'>
          <Button className="mb-2" onClick={handleBackToChats}>
            Volver a Chats
          </Button>
          {
            chatData && chatData.data && chatData.data.users
              ? (chatData.data.users.length === 2
                ? <h2 className='ms-3'>{friendName}</h2>
                : <h2 className='ms-3'>{chatData.data.name}</h2>)
              : null
          }
        </div>
      </div>

      <div className="chat__history">
        {chatHistory && chatHistory.map((message, index) => (
          <Message
            key={message._id || index}
            actualUser={userIdState}
            sender={message.sender}
            text={message.content}
          />
        ))}
        <div ref={chatHistoryRef} />
      </div>

      <form onSubmit={handleSubmit} className='chat__submit'>
        <input
          className='chat__submitInput'
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Escribe un mensaje..."
          style={{ flexGrow: 1 }}
        />
        <button className='chat__sendButton' type="submit">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default Chat;

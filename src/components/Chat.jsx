import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Message from "Components/Message";
import { getUserDataByToken } from '../services/getUserDataByToken';
import { restful } from "/restApi/index.js"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useErrorContext } from './Context/ErrorContext';
// import { useXmpp } from './Context/XmppContext';

function Chat() {
  const userToken = localStorage.getItem("token");
  const { idChatParam } = useParams();
  const navigate = useNavigate();
  const chatHistoryRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [userIdState, setUserIdState] = useState("");
  const [userFriends, setUserFriends] = useState([]);
  const [chatData, setChatData] = useState({});
  const [friendName, setFriendName] = useState("");
  const [friendId, setFriendId] = useState("")
  const [addedFriend, setAddedFriend] = useState("")
  const lastWriter = useRef(null);
  const { setError } = useErrorContext();
  // const  {sendMessage, messages} = useXmpp()

  /**
   * Function to change who is the writer
   * @param {*} newLastWriter 
   */
  const changeLastWriter = (newLastWriter) => {
    lastWriter.current = newLastWriter;
  }

  const addFriend = async (event) => {
    let response = await restful("POST", `http://localhost:3001/api/user/addFriendToUser`, { friendId, userId: userIdState })

    if (response.status) {
      setError("Amigo agregado correctamente.")
    }
    else {
      setError(response.msg)
    }
  }

  useEffect(() => {
    const initializeChat = async () => {
      setAddedFriend("")
      try {
        const userdata = await getUserDataByToken(userToken);
        console.log(userdata)
        if (!userdata.status) {
          console.log("Reenviado");
          return navigate('/Se ha cerrado sesión automaticamente');
        }

        const userId = userdata.data.data.id;
        setUserIdState(userId);
        // console.log(userdata.data.data.friends)
        setUserFriends(userdata.data.data.friends);

        const chatResponse = await restful("GET", `http://localhost:3001/api/chat/getChat/${idChatParam}`);
        setChatData(chatResponse);
        setChatHistory(chatResponse.data.messages);

        const friendId = chatResponse.data.users.find(id => id !== userId);
        const friendResponse = await restful("GET", `http://localhost:3001/api/user/${friendId}`);
        setFriendName(friendResponse.name);
        setFriendId(friendResponse._id)
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
    // ? Operator is to check if this is correct before doing the operation to save from any error
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
        console.log(response)
        const newMessage = {
          _id: response._id,
          sender: userIdState,
          content: inputText,
          time: instantMoment,
        };

        // // Send the message thru ejabberd
        // response.users.map(user=>{sendMessage(`${recipient}@localhost`, jsonContent)})


        setChatHistory(prevChatHistory => [...prevChatHistory, newMessage]);
        setInputText('');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleBackToChats = () => {
    navigate("/chat");
  };

  // console.log(userFriends)

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
                ? <h2 className='ms-3 chat__name'>{friendName}</h2>
                : <h2 className='ms-3 chat__name'>{chatData.data.name}</h2>)
              : null
          }
        </div>

        {
          userFriends && !userFriends.includes(friendId) && <button onClick={addFriend}><i className="fa-solid fa-user-plus"></i></button>
        }
      </div>

      <div className="chat__history">
        {chatHistory && chatHistory.map((message, index) => (
          <Message
            key={message._id || index}
            actualUser={userIdState}
            sender={message.sender}
            text={message.content}
            isChat={message.users > 2 ? true : false}
            changeLastWriter={changeLastWriter}
            lastWriter={lastWriter}
          />
        ))}
        <div className='spacer' ref={chatHistoryRef} />
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

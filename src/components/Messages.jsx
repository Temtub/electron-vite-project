import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useCheckSession } from '../services/hooks/useCheckSession';
import { getNewChat } from '../services/getNewChat';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { restful } from "/restApi"
import { useEffect, useState } from 'react';
import { useErrorContext } from './Context/ErrorContext';
import ChargingChats from './ChargingChats';
import Chats from './Chats';
import { FlyingMessage } from './specialMessages/FlyingMessage';
let token;

function Messages() {

  const token = useCheckSession();
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null);
  const [newChat, setNewChat] = useState([])
  const [showChatList, setShowChatList] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const { error } = useErrorContext();

  const navigate = useNavigate();

  useEffect(() => {
    const chargeMessages = async () => {
      if (token) {
        try {
          let response = await restful("GET", `http://localhost:3001/api/user/${token.data.id}`);
          setUserData(response);
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      }
    };

    chargeMessages();
  }, [token]);

  useEffect(() => {
    if (window.innerWidth <= 767.98) {
      setShowChat(false);
      setShowChatList(true);
    }
  }, []);

  const handleChatClick = () => {
    setShowChat(true);
    setShowChatList(false);
  };

  const searchNewChat = async () => {
    if (userData) {
      setLoading(true);
      const response = await getNewChat(userData._id);
      setLoading(false);
      if (typeof response._id == 'undefined') {
        return
      }
      navigate(`/chat/${response._id}`);
    }
  };


  return (
    <Container fluid className='messages'>
      <Row className={`chat-sidebar ${showChatList ? 'd-block' : 'd-none'}`}>
        <Col className="ps-1 d-flex flex-column align-items-start">
        {/* "navbar" of the side part */}
          <div className='ps-2'>

            <h2>Chats</h2>
            <Button
              title='Añade un nuevo chat'
              className='searchChatButton'
              disabled={loading}
              onClick={searchNewChat}
            >
              {loading ? 'Buscando...' : <i className="fa-solid fa-plus"></i>}
            </Button>
          </div>
          {/* List of the chats */}
          {userData ? <Chats data={userData.chats} onChatClick={handleChatClick} /> : <ChargingChats />}
        </Col>
      </Row>

      <Row className={`chat__container ${showChat ? 'd-block' : 'd-none'}`}>
        <Col>

          <Outlet />
        </Col>
      </Row>

      {error && <FlyingMessage msg={error} ></FlyingMessage>}

    </Container>
  );
};


export default Messages;

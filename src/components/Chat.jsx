import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Import the components that we will need
import Message from "Components/Message";//Box for a single message



function ChatForm() {

  //Get the id of the user you want to show the chat from the url
  const {iduserParam} = useParams()

  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputText.trim() !== '') {
      setChatHistory([...chatHistory, inputText]);
      setInputText('');
    }
  };

  return (
    <div className='chat'>

      <div className="chat__history">
        {chatHistory.map((message, index) => (
          <Message key={index} text={message}></Message>
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

export default ChatForm;

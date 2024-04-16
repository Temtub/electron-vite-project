import { useState } from 'react';
import { useParams } from 'react-router-dom';

function ChatForm() {

  const {iduser} = useParams()

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

      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>

    </div>
  );
}

export default ChatForm;

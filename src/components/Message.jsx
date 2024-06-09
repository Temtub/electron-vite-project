import React, { useEffect, useState } from 'react';
import { restful } from "/restApi/index.js";

function Message({ text, actualUser, sender, author, changeLastWriter, lastWriter, isChat }) {
  const [friendName, setFriendName] = useState("");
  const [shouldDisplayWriter, setShouldDisplayWriter] = useState(true);

  if(sender == actualUser){
    return (
      <div className="message messageByUser">
        {text}
      </div>
    );
  } else if(isChat){
    console.log("elo")
    return (
      <div className="message">
        {text}
      </div>
    );
  }

  useEffect(() => {
    if (lastWriter.current !== sender && sender !== actualUser) {
      const getFriendName = async () => {
        let response = await restful("GET", `http://localhost:3001/api/user/${sender}`);
        // console.log("Respuesta de conseguir friend name", response)
        setFriendName(response.name);
      };
      getFriendName();
      changeLastWriter(sender);
    } else {
      setShouldDisplayWriter(true);
    }
    
  }, [sender, actualUser, lastWriter, changeLastWriter]);

  return (
    <div className={shouldDisplayWriter ? "messageCont" : "messageWithoutWriter"}>
      {shouldDisplayWriter && friendName && <p className="message__writer">{friendName}</p>}
      <p className='message'>{text}</p>
    </div>
  );
}

export default Message;

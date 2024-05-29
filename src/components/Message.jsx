
function Message({ text, actualUser, sender, author }) {

  // console.log(sender == actualUser)
  if (sender == actualUser) {
    return (
      <div className='message messageByUser' >
        {text}
      </div>
    );
  }
  else {

    return (
      <div className='message' >
        {text}
      </div>
    );
  }
}

export default Message;

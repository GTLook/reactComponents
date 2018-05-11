import React from 'react';
import Message from './Message'

const Messages = ({message, handleCheckBox}) => {

return (
  <div>
    <Message item={message} handleCheckBox={handleCheckBox}/>
  </div>
  )
}


export default Messages

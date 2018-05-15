import React from 'react';
import Message from './Message'

const MessageList = ({inbox, handleCheckBox, handleStar}) => {
  return (
    <div>
      {
        inbox.map((item, id) => (
          <Message key={item.id} inbox={item} handleCheckBox={handleCheckBox} handleStar={handleStar}/>
        ))
      }
    </div>
    )
  }


export default MessageList

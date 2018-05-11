import React from 'react';

const Message = ({item:{id, text, checked, isRead, isStar}, handleCheckBox}) => {
  return (
    <div className={["row message", isRead?'unread':'read', checked?'selected':''].join(' ')}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={(event) => handleCheckBox(id, event.target.checked)}
            />
          </div>
          <div className="col-xs-2">
            <i className={["star", "fa", isStar?"fa-star":"fa-star-o"].join(' ')}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a href="#">
          { text }
        </a>
      </div>
    </div>
    )
}

export default Message

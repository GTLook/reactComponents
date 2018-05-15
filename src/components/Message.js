import React from 'react';
import Label from './Label'

const Message = ({ inbox:{id, labels, subject, selected, read, starred}, handleCheckBox, handleStar, markAsRead }) => {
  return (
    <div className={["row message", read?'unread':'read', selected?'selected':''].join(' ')} >
      <div className="col-xs-1">
        <div className="row" >
          <div className="col-xs-2">
            <input
              type="checkbox"
              checked={selected}
              onChange={(event) => handleCheckBox(id, event.target.checked)}
            />
          </div>
          <div className="col-xs-2">
            <i
            className={["star", "fa", starred?"fa-star":"fa-star-o"].join(' ')}
            onClick={(event) => handleStar(id)}
           />
       </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labels.map(label => <Label label={label} />)}
        <a href="#">
          { subject }
        </a>
      </div>
    </div>
    )
}

export default Message

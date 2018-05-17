import React, { Component } from 'react';
import Label from './Label'
import MessageBody from './MessageBody'

class Message extends Component{
  constructor(props){
    super(props)
    this.state = { showMessage: false }
  }
  render(){

    const { inbox:{id, labels, subject, selected, read, starred}, handleCheckBox, handleStar, markAsRead } = this.props

    return (
      <div>
        <div className={["row message", read?'unread':'read', selected?'selected':''].join(' ')} >
          <div className="col-xs-1">
            <div className="row">
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
          <div className="col-xs-11" onClick={() => {this.setState({showMessage: !(this.state.showMessage)})}}>
            {labels.map(label => <Label label={label} />)}
            <a href="#">
              { subject }
            </a>
          </div>
        </div>
        {this.state.showMessage?<MessageBody />:null}
      </div>
    )
  }
}

export default Message

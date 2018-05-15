import React, { Component } from 'react'
import shortid from 'shortid'
import Toolbar from './Toolbar'
import MessageList from './MessageList'

const inbox = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

class Inbox extends Component {
  constructor(props){
    super(props)
    this.state = {inbox: inbox}
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newMail = { id: shortid.generate(), task: event.target.newMail.value, checked: false}
    this.setState({ inbox: [...this.state.inbox, newMail ] })
  }

  handleCheckBox = (id, selected) => {
    const newInbox = this.state.inbox.map(ele => ele.id === id ? {...ele, selected} : {...ele})
    this.setState({inbox: newInbox})
  }

  handleStar = (id) => {
    const newInbox = this.state.inbox.map(ele => ele.id === id ? {...ele, starred: !ele.starred} : {...ele})
    this.setState({inbox: newInbox})
  }

  handleCheckBoxAll = (id) => {
    let selectAll = (((this.state.inbox.some(obj => obj['selected'])) || (this.state.inbox.every(obj => !obj['selected']))) && !(this.state.inbox.every(obj => obj['selected'])))
    const newInbox = this.state.inbox.map(ele =>  selectAll ? {...ele, selected:true} : {...ele, selected:false})
    this.setState({inbox: newInbox})
  }

  handleDelete = () => {
    this.setState({inbox: this.state.inbox.filter(ele => !ele['selected'])})
  }

  handleMarkAsRead = () => {
    this.setState({inbox: this.state.inbox.map(ele => ele['selected'] ? {...ele, read:true} : {...ele})})
  }

  handleMarkAsUnread = () => {
    this.setState({inbox: this.state.inbox.map(ele => ele['selected'] ? {...ele, read:false} : {...ele})})
  }

  handleAddTag = (label) => {
    this.setState({inbox: this.state.inbox.map(ele => ele['selected'] ? {...ele, labels:[...ele.labels, label]} : {...ele})})
  }

  handleRemoveTag = (label) => {
    this.setState({inbox: this.state.inbox.map(ele => ele['selected'] ? {...ele, labels:[!ele.labels.filter(item => item === label)]} : {...ele})})
  }

  render(){
    return (
      <div>
        <Toolbar inbox={this.state.inbox} handleCheckBoxAll={this.handleCheckBoxAll} handleMarkAsRead={this.handleMarkAsRead} handleMarkAsUnread={this.handleMarkAsUnread} handleDelete={this.handleDelete} handleAddTag={this.handleAddTag} handleRemoveTag={this.handleRemoveTag}/>
        <MessageList inbox={this.state.inbox} handleCheckBox={this.handleCheckBox} handleStar={this.handleStar} />
      </div>
    )
  }
}

export default Inbox

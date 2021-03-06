import React, { Component } from 'react'
import shortid from 'shortid'
import axios from 'axios'

import Toolbar from './Toolbar'
import MessageList from './MessageList'
import ComposeMessage from './ComposeMessage'

const getSelected = (inbox) => inbox.filter(ele => ele['selected']).map(obj => obj.id)

class Inbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      inbox: [],
      showCompose: false
    }
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = () => {
    axios.get('http://localhost:8082/api/messages')
    .then((result) => this.setState({inbox: result.data}))
    .catch(console.error())
  }

  handleSubmit = (event) => {

    console.log(event.target.subject.value);
    console.log(event.target.body.value);
    axios.post('http://localhost:8082/api/messages', {subject: event.target.subject.value, body: event.target.body.value})
    .then(() => this.getData())
    .catch(console.error())
  }

// patchData = () => {
//   axios.patch('http://localhost:8082/api/messages',{
//     command: '',
//     []
//   })
//   .then(console.log(result))
//   .catch(error)
// }

// handleSubmit = (event) => {
//   event.preventDefault()
//   patchData({ id: shortid.generate(), task: event.target.newMail.value, checked: false})
//   this.setState({ inbox: [...this.state.inbox, newMail ] })
// }

  handleCheckBox = (id, selected) => {
    const newInbox = this.state.inbox.map(ele => ele.id === id ? {...ele, selected} : {...ele})
    this.setState({inbox: newInbox})
  }

  handleStar = (id) => {
    axios.patch('http://localhost:8082/api/messages', {messageIds: [id], command:'star'})
    .then(() => this.getData())
  }

  handleCheckBoxAll = (id) => {
    let selectAll = (((this.state.inbox.some(obj => obj['selected'])) || (this.state.inbox.every(obj => !obj['selected']))) && !(this.state.inbox.every(obj => obj['selected'])))
    const newInbox = this.state.inbox.map(ele =>  selectAll ? {...ele, selected:true} : {...ele, selected:false})
    this.setState({inbox: newInbox})
  }

  handleDelete = () => {
    axios.patch('http://localhost:8082/api/messages', {messageIds: getSelected(this.state.inbox), command:'delete'})
    .then(() => this.getData())
  }

  handleMarkAsRead = () => {
    axios.patch('http://localhost:8082/api/messages', {messageIds: getSelected(this.state.inbox), command:'read', read:true})
    .then(() => this.getData())
  }

  handleMarkAsUnread = () => {
    axios.patch('http://localhost:8082/api/messages', {messageIds: getSelected(this.state.inbox), command:'read', read:false})
    .then(() => this.getData())
  }

  handleAddTag = (label) => {
    axios.patch('http://localhost:8082/api/messages', {messageIds: getSelected(this.state.inbox), command:'addLabel', label:label})
    .then(() => this.getData())
  }

  handleRemoveTag = (label) => {
    axios.patch('http://localhost:8082/api/messages', {messageIds: getSelected(this.state.inbox), command:'removeLabel', label:label})
    .then(() => this.getData())
    }

  handleCompose = () => {
    this.setState({showCompose: !this.state.showCompose})
  }

   render(){
    return (
      <div>
        <Toolbar
          inbox={this.state.inbox}
          showCompose={this.state.showCompose}
          handleCheckBoxAll={this.handleCheckBoxAll}
          handleMarkAsRead={this.handleMarkAsRead}
          handleMarkAsUnread={this.handleMarkAsUnread}
          handleDelete={this.handleDelete}
          handleAddTag={this.handleAddTag}
          handleRemoveTag={this.handleRemoveTag}
          handleCompose={this.handleCompose}
        />
        {this.state.showCompose? <ComposeMessage handleSubmit={this.handleSubmit}/> : null}
        <MessageList
          inbox={this.state.inbox}
          handleCheckBox={this.handleCheckBox}
          handleStar={this.handleStar}
        />
      </div>
    )
  }
}

export default Inbox

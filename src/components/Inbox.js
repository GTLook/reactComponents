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

// postData = ({subject, body}) => {
//   axios.post('http://localhost:8082/api/messages', {subject, body})
//   .then((result) => console.log(result))
//   .catch(console.error())
// }

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
    // axios.patch('http://localhost:8082/api/messages', {messageIds: [id], command:'selected'})
    // .then(() => this.getData())
    const newInbox = this.state.inbox.map(ele => ele.id === id ? {...ele, selected} : {...ele})
    this.setState({inbox: newInbox})
  }

  handleStar = (id) => {
    axios.patch('http://localhost:8082/api/messages', {messageIds: [id], command:'star'})
    .then(() => this.getData())
    //const newInbox = this.state.inbox.map(ele => ele.id === id ? {...ele, starred: !ele.starred} : {...ele})
    //this.setState({inbox: newInbox})
  }

  handleCheckBoxAll = (id) => {
    let selectAll = (((this.state.inbox.some(obj => obj['selected'])) || (this.state.inbox.every(obj => !obj['selected']))) && !(this.state.inbox.every(obj => obj['selected'])))
    const newInbox = this.state.inbox.map(ele =>  selectAll ? {...ele, selected:true} : {...ele, selected:false})
    this.setState({inbox: newInbox})
  }

  handleDelete = () => {
    axios.delete('http://localhost:8082/api/messages', {messageIds: getSelected(this.state.inbox), command:'delete'})
    .then(() => this.getData())
    //this.setState({inbox: this.state.inbox.filter(ele => !ele['selected'])})
  }

  handleMarkAsRead = () => {
    axios.patch('http://localhost:8082/api/messages', {messageIds: getSelected(this.state.inbox), command:'read'})
    .then(() => this.getData())
    //this.setState({inbox: this.state.inbox.map(ele => ele['selected'] ? {...ele, read:true} : {...ele})})
  }

  handleMarkAsUnread = () => {
    axios.patch('http://localhost:8082/api/messages', {messageIds: getSelected(this.state.inbox), command:'unread'})
    .then(() => this.getData())
    //this.setState({inbox: this.state.inbox.map(ele => ele['selected'] ? {...ele, read:false} : {...ele})})
  }

  handleAddTag = (label) => {

    this.setState({inbox: this.state.inbox.map(ele => ele['selected'] ? {...ele, labels:[...ele.labels, ele.labels.some(ele => ele==label)?null:(label !== 'Apply label')?label:null]} : {...ele})})
  }

  handleRemoveTag = (label) => {
    this.setState({inbox: this.state.inbox.map(ele => ele['selected'] ? {...ele, labels:ele.labels.filter(item => item !== label)} : {...ele})})
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
        {this.state.showCompose? <ComposeMessage /> : null}
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

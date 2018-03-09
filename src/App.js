import React, { Component } from 'react';
import axios from 'axios';
import UserList from './components/UserList/UserList'
import ChatBox from './components/ChatBox/ChatBox'
import Pusher from 'pusher-js';

class App extends Component {
  state = {
    response: '',
    message: '',
    toUser: '',
    userslist: [],
    loading: true,
  };

  componentWillMount() {
    const thiss = this;
    Pusher.logToConsole = true;
    const username = prompt("Enter your username");
    var pusher = new Pusher('fab90205c31a00dadad5', {
      cluster: 'ap2',
      encrypted: true
    });

    axios.get(`/get_id?username=${username}`)
      .then(response => {
        //listen to new-message
        var channel = pusher.subscribe(response.data.user_id);
        channel.bind('new-message', function(data) {
          thiss.setState({message: data.message})
        });
        const {user_id} = response.data;
        thiss.setState({loading: false, user_id, username})
      })
      .catch(err => {throw err})
  }

  componentDidMount = () => {
    const thiss = this
    axios.get('/listusers')
      .then(res => {
        const {userslist} = res.data
        // removing the username of the user from the list
        try {
          userslist.splice(userslist.indexOf(this.state.username),1)
        } catch(e) {
          //do nothing
        }
        thiss.setState({userslist})
      })
      .catch(err => {throw err})
  }

  handleMessage = (message) => {
    const {toUser, username} = this.state;
    const payload = {message, toUser, username}
    if(toUser)
    axios({
      method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
            url: '/send',
            mode: 'cors',
            data: JSON.stringify(payload)
        })
        .then(function (response) {
          console.log("Message sent")
        })
        .catch(function (error) {
          console.log(error)
        });
  }

  handleClick = (toUser) => {
    this.setState({toUser})
  }

  render() {
    const {userslist, toUser} = this.state;
    return (
      <div className="App">
        <UserList handleClick={this.handleClick} userslist={userslist}/>
        <ChatBox message={this.state.message} handleMessage={this.handleMessage} toUser={toUser}/>
      </div>
    );
  }
}

export default App;

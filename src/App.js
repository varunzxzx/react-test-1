import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';

import './App.css';
import Pusher from 'pusher-js';

class App extends Component {
  state = {
    response: '',
    message: '',
    toUser: ''
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
          alert(data.message);
        });
        const {user_id} = response.data;
        thiss.setState({loading: true, user_id, username})
      })
      .catch(err => {throw err})
  }

  handleFormChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleMessage = () => {
    const {message, toUser, username} = this.state;
    const payload = {message, toUser, username}
    console.log(payload);
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <label htmlFor="toUser">To User</label>
        <input type="text" id="toUser" onChange={this.handleFormChange} name="toUser"/>
        <label htmlFor="message">Message</label>
        <input type="text" id="message" onChange={this.handleFormChange} name="message"/>
        <div>
          <button onClick={this.handleMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default App;

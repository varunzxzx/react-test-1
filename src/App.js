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
        thiss.setState({loading: true, user_id})
      })
      .catch(err => {throw err})
  }

  handleFormChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleMessage = () => {
    const {message, toUser} = this.state;
    axios.post('/send',{message, toUser})
      .then(response => {
        console.log("Message sent")
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <label htmlFor="toUser" onChange={this.handleFormChange}>To User</label>
        <input type="text" id="toUser"/>
        <label htmlFor="message" onChange={this.handleFormChange}>Message</label>
        <input type="text" id="message"/>
        <div>
          <button onClick={this.handleMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default App;

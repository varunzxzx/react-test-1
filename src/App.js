import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';
import Pusher from 'pusher-js';

class App extends Component {
  state = {
    response: ''
  };

  componentWillMount() {
    Pusher.logToConsole = true;

    var pusher = new Pusher('fab90205c31a00dadad5', {
      cluster: 'ap2',
      encrypted: true
    });

    //listen to new message
    var channel = pusher.subscribe('message');
    channel.bind('new', function(data) {
      alert(data.message);
    });
    // this.callApi()
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response || null}</p>
      </div>
    );
  }
}

export default App;

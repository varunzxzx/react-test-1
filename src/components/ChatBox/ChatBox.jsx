import React, { Component } from 'react';

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    handleFormChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return(
            <div className="chat">
                <label htmlFor="toUser">To User</label>
                <input type="text" id="toUser" onChange={this.handleFormChange} name="toUser"/>
                <label htmlFor="message">Message</label>
                <input type="text" id="message" onChange={this.handleFormChange} name="message"/>
                <div>
                    <button type="submit">Send</button>
                </div>
            </div>
        )
    }
}

export default ChatBox;
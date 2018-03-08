import React, { Component } from 'react';
import './ChatBox.css'
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
                ngfn
            </div>
        )
    }
}

export default ChatBox;
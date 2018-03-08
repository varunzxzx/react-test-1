import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
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
                <Header as="h3" block>
                <div
                    className={"chat-letter"}
                    style={{
                        backgroundColor: "rgb(63, 81, 181)",
                    }}>
                        M
                    </div>
                Matthew
                </Header>
            </div>
        )
    }
}

export default ChatBox;
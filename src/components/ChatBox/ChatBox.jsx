import React, { Component } from 'react';
import { Header, Input } from 'semantic-ui-react';
import './ChatBox.css'
class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            active: 'React Chat Application'
        }
    }

    componentWillReceiveProps = (props) => {
        const {active} = props;
        if(active)
            this.setState({active})
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
                    {this.state.active.charAt(0).toUpperCase()}
                </div>
                {this.state.active}
                </Header>
                <div className="message-box">
                    <div className="message self">
                        Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                    </div>
                    <div className="message other">
                        Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                    </div>
                </div>
                <div className="myInput">
                    <Input action={{ color: 'blue', content: 'Send' }} fluid placeholder='Enter your message here...' />
                </div>
            </div>
        )
    }
}

export default ChatBox;
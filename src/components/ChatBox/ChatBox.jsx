import React, { Component } from 'react';
import { Header, Input } from 'semantic-ui-react';
import './ChatBox.css'
class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usermsg: {},
            message: '',
            toUser: 'React Chat Application'
        }
    }

    componentWillReceiveProps = (props) => {
        const {toUser} = props;
        const {usermsg} = this.state
        if(toUser) {
            usermsg[toUser] = {}
            this.setState({toUser, usermsg})
        }
    }

    handleFormChange = (e) => {
        if(e.which === 13) {
            this.submit()
        } else {
            this.setState({message: e.target.value})
        }
    }

    submit = () => {
        const {message, toUser} = this.state
        if(message){
            this.props.handleMessage(message);
            const {usermsg} = this.state
            const length = Object.keys(usermsg[toUser])
            usermsg[toUser][`me${length}`] = message
            this.setState({usermsg})
        }
    }

    componentWillReceiveProps(props) {
        console.log(props.message);
        const {usermsg, toUser} = this.state
        const length = Object.keys(usermsg[toUser])
        usermsg[toUser][`other${length}`] = props.message
        this.setState({usermsg})
    }

    render() {
        console.log(this.state.usermsg)
        return(
            <div className="chat">
                <Header as="h3" block>
                <div
                    className={"chat-letter"}
                    style={{
                        backgroundColor: "rgb(63, 81, 181)",
                    }}>
                    {this.state.toUser.charAt(0).toUpperCase()}
                </div>
                {this.state.toUser}
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
                    <Input onChange={this.handleFormChange} onKeyDown={this.handleFormChange} action={{ color: 'blue', content: 'Send', onClick: this.submit}} fluid placeholder='Enter your message here...' />
                </div>
            </div>
        )
    }
}

export default ChatBox;
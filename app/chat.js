import React from "react";
import io from "socket.io-client";

class Chat extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            connect : false,
            message: '',
            messages: []
        };

        this.socket = null;
        this.connectSocket = this.connectSocket.bind(this);
        this.disconnectSocket = this.disconnectSocket.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }


    connectSocket()
    {   
        console.log('Trying to connect to Server');
        if(!this.props.user)
        {
            console.log('User is undefined abort connection to Server');
            return;
        }


        this.socket = io('localhost:3000',{ query : `username=${this.props.user.username}` });

        this.socket.on('connect', function()
        {
            console.log('Connected to server');

            this.setState({
                connect : true,
                messages: []
            });

            this.socket.on('disconnect', function(){
                console.log('Disconnected from server .....');
                this.setState({
                connect : false
                });
            }.bind(this));

            this.socket.on('receiveMessage', function(data){
                this.addMessage(data.message);
            }.bind(this));

        }.bind(this));  
    }

    disconnectSocket()
    {
        if(!this.props.user)
        {
            return;
        }
        this.socket.disconnect();
        var message = {
            from: 'me',
            text: 'Disconnected'
        };
        var messages = this.state.messages.slice(); 
        messages.push(message);   
        this.setState({
            messages
            });
    }

    addMessage(message)
    {
        var messages = this.state.messages.slice();    
        messages.push(message);   
        this.setState({
            messages
            });
    }

    sendMessage(ev)
    {
        ev.preventDefault();
        var message = {
            from: this.props.user.username,
            text: this.state.message
        };
        this.socket.emit('sendMessage', message , function (){
            console.log('Message received');
        });
        var messages = this.state.messages.slice(); 
        message.from = 'me';   
        messages.push(message);   
        this.setState({
            message: '',
            messages
            });
    }

    renderModule()
    {
        if(!this.state.connect){
            return (
            <div className="login-container center">  
                <button className="btn" onClick={this.connectSocket}>Connect To Chat</button>
            </div>  
            );
        }else{
            return (
            <div className="flex">
                <div className="width-10">
                    <label>{`Connected as ${ this.props.user.username}`}</label>
                    <button className="btn" onClick={this.disconnectSocket}>Disconnect</button>
                </div>
                <div className="width-90">
                    <div>
                        <div className="">Global Chat</div>
                        <hr/>
                        <div className="chat-container width-90">
                            {this.state.messages.map( (message,index) => {
                                return (
                                    <div key={index}>{message.from}: {message.text}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="flex">
                            <div className="width-90">
                                <input className="input-msg" type="text" placeholder="Message" value={this.state.message} onChange={ (ev) => this.setState({message: ev.target.value})}/>
                            </div>
                            <div>
                                <button onClick={this.sendMessage} className="btn no-left-border">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );  
        }
    }

    render(){
        return (
            <div className="container">
                {this.renderModule()} 
            </div>   
        );
    }
}

export default Chat;
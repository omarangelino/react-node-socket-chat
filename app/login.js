import React from "react";

class Login extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            username: ''
        };

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(ev)
    {
        ev.preventDefault();
        var user = {
            username: this.state.username
        };
        
        this.props.login(user);
        this.setState({
            username: ''
        });
    }

    render(){
        return (
            <div className="login-container">
                <label>Login</label>
                <input className="inp" type="text" placeholder="username..." value={this.state.username} onChange={ (ev) => this.setState({username: ev.target.value})}/>
                <button className="btn" onClick={this.handleOnClick} >Login</button>
            </div>
        );
    }
}

export default Login;
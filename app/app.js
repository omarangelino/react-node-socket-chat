import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Login from "./login";
import Chat from "./chat";

class App extends Component {
 	constructor() 
 	{
	    super();
	    this.state = {
	      user: null
	    };

	   this.login = this.login.bind(this);
	   this.logout = this.logout.bind(this);
	   this.renderModule = this.renderModule.bind(this);
  	}

  	
  	login(user)
  	{
  		if(!user || !user.username || user.username == ""){
  			return;
  		}
  		console.log('Loggin as ' + JSON.stringify(user, undefined, 2));
  		this.setState({
      		user: user
    	});
  	}

  	logout()
  	{
  		this.setState({
      		user : null
    	});
  	}
 
  	renderModule()
  	{
  		if(!this.state.user){
  			return (
          		<Login login={this.login}/>
      		);
  		}else{
  			return (
          		<Chat user={this.state.user} logout={this.logout}/>
      		);	
  		}
  	}

  render() {
  	 
    return (
      <div>
           {this.renderModule()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
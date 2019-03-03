import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import $ from 'jquery';
import './App.css';

class  Login extends Component {
  constructor(props){
    super(props)
    this.state={username:"",password:"",enter:false,login:false};
    this.handleChange=this.handleChange.bind(this);
    this.handleChange1=this.handleChange1.bind(this);
  }

handleChange(e){
  this.setState({username:e.target.value});
}

handleChange1(e){
  this.setState({password:e.target.value});
}

submit(){
  $.post( "http://localhost:3001/login",this.state,(data,status)=>{

  console.log("res aya ha");
    if(data=="login"){
      localStorage.setItem("token", data.token);
        this.props.change_name(this.state.username);
    this.setState({enter:true});
  }
  else {
      localStorage.setItem("token", "invalid");
    this.setState({login:true});
  }
            });

}


render(){
  var redirect;
  var not_login=null;

if(this.state.enter)
redirect=<Redirect to="/home"/>
else {
  redirect=null;
}
if(this.state.login)
not_login=<div>Wrong credentials</div>

return(
  <div>

  {redirect}
<input  onChange={this.handleChange}/>
<input  onChange={this.handleChange1}/>
<button type="button"   onClick={this.submit.bind(this)}>login</button>
{not_login}
</div>

)

}
}

export default Login;

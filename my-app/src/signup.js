import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import $ from 'jquery';
import './App.css';
import Home from  './home.js';
import Login from './login.js'
import {BrowserRouter as Router} from 'react-router-dom';




class Signup extends Component {
  constructor(props){
    super(props)
    this.state={email:"fgdf",password:"",count:""};
    this.handleChange=this.handleChange.bind(this);
    this.handleChange1=this.handleChange1.bind(this);
  }

handleChange(e){
  this.setState({email:e.target.value});
}

handleChange1(e){
  this.setState({password:e.target.value});
}

submit(){
  this.props.change_name(this.state.email);
  $.post( "http://localhost:3001/SignUp",this.state,(data,status)=>{
    console.log(data)
localStorage.setItem("token", data.token);
  console.log("login hua");
this.setState({count:"fgd"});

            });

}


render(){
  var redirect=false;
  if(localStorage.getItem("token")!==null)
  redirect=true;
console.log(redirect);
  if(redirect)
  var page= <Redirect to="/home" />


return(


      <div>
  {page}

  {!redirect ? (<div>
    <input  onChange={this.handleChange}/>
    <input  onChange={this.handleChange1}/>
    <button type="button"   onClick={this.submit.bind(this)}>Signup</button>
    </div>
      ) : (
        <Route path="/home" exact render={(props) => (<Home test="hi" />)} />)}
<Switch>
<Router>
         <Route path="/login" render={(props)=><Login text="aooooo"/>}/>
        </Router>
</Switch>

  </div>


)

}
}

export default Signup;

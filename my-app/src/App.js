import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import $ from 'jquery';
import './App.css';
import Login from  './login.js';
import Signup from  './signup.js';
import Home from  './home.js';



class App extends Component {
constructor(props)
{
  super(props)
  this.state={username:""}
}

name(new_name)
{
  this.setState({username:new_name});
}


render(){

console.log(this.state.username);
return(


      <div>

        <Switch>
      <Route path="/home"  render={(props)=><Home text={this.state.username}/>} />
          <Route path="/Signup" render={(props)=><Signup change_name={this.name.bind(this)}/>}/>

            <Route path="/login"  render={(props)=><Login change_name={this.name.bind(this)}/>}/>
        </Switch>
        </div>



)

}
}

export default App;

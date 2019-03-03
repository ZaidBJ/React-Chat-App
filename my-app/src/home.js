import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import './App.css';
import io from 'socket.io-client';
var socket;
var input;
var list;
var options;
var val;
var empty_suggestion=false;
var msg_from;
var notify_msg=[{sender:"",message_count:null,visible:true}];
var notification=false;
var tell_user;
var input_change=false;;
var input_box;
var show_chat=false;
var msg_count=0;
var push=true;
var remove_item=true;
var class_change:"";
function Number(props) {
  var height= (props.shift+1+0.3*props.shift)*65 +"px";
  console.log(height)
  console.log("Number");
  console.log(props)
  return <span style={{ color :"white" ,position:'absolute', zIndex:'3', top:"150px", left:height ,margin:"0px"}}>{props.no}</span>;
}
class Signup extends Component {
  constructor(props){
    super(props)
    this.state={name:"",user:[],msg:"",recieve_message:[],user_status:"",chat_with:"",chat:[],from:"",for_stateChange:"s",cls:""};
    this.handleChange=this.handleChange.bind(this);
this.check_online=this.check_online.bind(this);
this.show_message=this.show_message.bind(this);
  }

do(){
  console.log("wooooo")
}
  componentDidMount(){
    console.log("mount")
    var string="?name="+this.props.text ;
 socket=io.connect("localhost:3001"+string);


socket.on("receipt",(data)=>{
  console.log("receipt")
  console.log(data.from);




       msg_count+=1;
       for(var i=0;i<notify_msg.length;i++)
       {
         if(data.from===notify_msg[i].sender){
           console.log("matched");
           console.log(notify_msg[i].sender)
         notify_msg[i].message_count+=1;
         push=false;

                  break;
       }
       else {
         push=true;
       }

       }
if(push && (msg_from !== data.from))
{ if(notify_msg.length>0)
  if(notify_msg[0].sender<2)
  notify_msg.splice(0,1);
 notify_msg.push({sender:data.from,message_count:1});
push=true;
}
notification=true;



  this.setState((prevState,props)=>({chat:[...prevState.chat,{sended:"green",message:data.dt,from:data.from} ],from:data.from,chat_with:msg_from}));
});


  }

  show_message(msg)
  {
    this.setState({user_status:msg})
  }

check_online(){
console.log("check online")
}



  componentWillUnmount(){
    console.log("unmount");
  }

handleChange(e){
  console.log("mehnatr")
  if(!empty_suggestion){
  if(e.target.value.length==0)
  this.setState({user:[],user_status:""})
var k=e.target.value;
console.log("handle change")
  if(e.target.value.length>0){
  $.post( "http://localhost:3001/search",{name:e.target.value},(data,status)=>{



console.log(data)
  this.setState({name:k,user:data})




});
}
}
else {

  socket.on("status",(status) =>{
    if(status=="online")
    this.show_message("user is online")

    else {
      this.show_message("user is offline");

    }
  });

  var inp =document.getElementById("box");
console.log("status manga ha");
msg_from=inp.value;
socket.emit("is_online",{user:inp.value});
this.setState({user:[],chat_with:inp.value,cls:class_change});
empty_suggestion=false;
}
}

getSelected(i)
{
  console.log("search chala "+ i)
}

handleChange1(e){
var msg_a="  "+e.target.value+" "
  this.setState({msg:msg_a,user_status:""});
}

sendMsg(){
    socket.emit("msg",{msg:this.state.msg,sender:this.props.text});
    if(input_change){
input_box=document.getElementById("box").value;
input_change=false;
}
document.getElementById("messenger").value=""
this.setState((prevState,props)=>({chat:[...prevState.chat,{sended:"blue",message:prevState.msg,from:input_box} ]}));

}

new_chat(index)
{


    msg_from=notify_msg[index].sender;
  notification=false;
input_box=msg_from;
socket.emit("is_online",{user:msg_from});
notify_msg.splice(index,1);
document.getElementById("messenger").value="";
this.setState({for_stateChange:"",cls:"above"})
}


change_input(new_val)
{console.log("new_val")
  var inp =document.getElementById("box");
  empty_suggestion=true;
  inp.value=new_val;
class_change="above"
    input_change=true;
this.handleChange();
}

render(){
if(remove_item)
{notify_msg=[];
  remove_item=false
}
  var allow=false;;
  if(localStorage.getItem("token")!==null){                         ////////////////////////////////inverse allow value to enable authentication
    console.log("entered")
  allow=false;
  }
  else {
    allow=false;
  }

//  if(notification)
//   tell_user=<div className="alert alert-success" onClick={this.new_chat.bind(this)}>{notify_msg}</div>
//  else
//  tell_user=null;


console.log("chcsad");
console.log(this.state.chat)
var notify=null;
if(this.state.user_status=="user is online")
  notify=  <div id="user_status" className="alert alert-success">{this.state.user_status}</div>
if(this.state.user_status=="user is offline")
  notify=  <div id="user_status" className="alert alert-danger">{this.state.user_status}</div>
return(


      <div>









      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">{this.props.text}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="#">Group Chat <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">LogOut</a>
            </li>
                  </ul>
          <form class="form-inline my-2 my-lg-0">
            <input  autocomplete="off"  id="box" onChange={this.handleChange} className="form-control mr-sm-2" type="search" placeholder="Search"/>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>





















  {(allow)?<Redirect to="/login"/>:null}


      {notify_msg.map((new_msg,index)=>
    <span className="msg_notifications"  key={index} onClick={this.new_chat.bind(this,index)}>{new_msg.sender.substring(0,1).toUpperCase()}</span>
      )}

      {notify_msg.map((new_msg,index)=>
        <Number no={new_msg.message_count} shift={index}></Number>

      )}


{notify}
{tell_user}

  {this.state.user.map((user,index)=>

<span   className="suggestion"  onClick={this.change_input.bind(this,user.email)}  style={{display:'block',background:'#F7F7F7',width:'14%'}} key={index}>{user.email}</span>

  )}


  <form>
    <div className="form-group">
  <input className="form-control" id="messenger" onChange={this.handleChange1.bind(this)}/>
  </div>
  </form>

<img id="size"  onClick={this.sendMsg.bind(this)} src="https://image.flaticon.com/icons/svg/123/123382.svg "/>




<div className={this.state.cls} id="other">{msg_from}</div>
<div id="bg">
    {this.state.chat.map((value,index)=>
(value.from==msg_from)?<div className={value.sended} key={index}>{value.message}</div>:<span></span>
)  }
      </div>
</div>

)

}
}

export default Signup;

var express = require("express");
var app=express();
var mongoose= require("mongoose");
var BodyParser= require("body-parser");
var jwt=require("jsonwebtoken");
var bcrypt=require("bcrypt");
var socket= require("socket.io");

function assign_name(value)
{
  this.name=value;

assign_name.prototype.sayHi = function() {
  return this.name;
}
}


function id_chat(value)
{
  this.id=value;

id_chat.prototype.get_id = function() {
  return this.id;
}
}


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/authentication");

//User
var userSchema= new mongoose.Schema({
  email:{ type:String},password:{ type:String},id:{ type:mongoose.Schema.Types.ObjectId,ref:"Messages"}
});


var User=mongoose.model('user',userSchema);

app.get("/login",function(req,res){
res.send("hello batman");});



//Messages
var messagesSchema= new mongoose.Schema({
 message:{type:String},id:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
});

var Messages=mongoose.model('message',messagesSchema);


app.post("/SignUp",function(req,res){
  console.log(req.body.email +" "+req.body.password);
 bcrypt.hash(req.body.password,10,function(err,hashed){
   User.create({email:req.body.email,password:hashed},function(err,user){
    console.log("user ye ha "+user);
    var token=jwt.sign({userid:user._id},"rtthyj");
    res.json({
userId:user._id,
      token
    })
  })
 });
});



app.post("/login",function(req,res){
  User.findOne({email:req.body.username},function(err,user){
    if(user){
    console.log("  fsdf"  +"   "+req.body.password);
 bcrypt.compare(req.body.password,user.password,function(err,ress){

              if(ress){
    res.send("login")
  }
  else
    res.send("Get out");
});
}
else {
  res.send("get out")
}
  });

});


app.get("/check",function(req,res){

jwt.verify(req.body.token,"rtthyj",function(err,decoded){
if(decoded){
if(decoded.userid==req.body.id)
  res.send("success");
  else
    res.send("failure");}
  else
    res.send("illegal token");
});
});


app.post("/search",function(req,res){
  console.log(req.body.name)
User.find({email:new RegExp(req.body.name, 'i')},function(err,user){
res.json(user);
})
//jwt.verify(req.body.token,"rtthyj",function(err,decoded){
//f(decoded){
//f(decoded.userid==req.body.id)
//  res.send("success");
////  else
//  else
//  res.send("illegal token");
//}//);

});

var socket_ids=[{name:"",code:""}];
  var receiver=[];
var server=app.listen(3001,function(){
console.log("guru ho ja shuru");});
io=socket(server);
var loop=false;
io.on("connection",function(socket){



    var  name = new assign_name(socket.handshake.query.name);


for(var i=0;i<socket_ids.length;i++)
{console.log("check krlo");
  console.log((socket.handshake.query.name.localeCompare(socket_ids[i].name)))
if((socket.handshake.query.name.localeCompare(socket_ids[i].name))==0)
  {  socket_ids[i].code=socket.id;
                                         /////////as first or before elements were pushing the extra term so we need to pop the last element , taking care ki jo add hua ha abhi
            loop=false;                                                        ///////////// wo khud na urjae
break;
  }

    else {
      console.log("pushed")

      loop=true;
      console.log(socket_ids[i])
    }
}
if(loop)
  socket_ids.push({name:socket.handshake.query.name, code:socket.id});

console.log("socket active");
console.log(socket_ids);

socket.on("msg",function(data){

for(var i=0;i<receiver.length;i++)
{
  if(socket.id==receiver[i].from)
  var send_to=receiver[i].to;
}
//socket.emit("reciept", "sdsdsf");
//socket.broadcast.emit('receipt', 'hello friends!');


socket.broadcast.to(send_to).emit('receipt',{dt:data.msg,from:data.sender });
});

socket.on('logout', function(socket) {

     for(var i=0;i<socket_ids.length;i++)
     {

     if((  (name.sayHi()).localeCompare(socket_ids[i].name))==0)
       {  socket_ids[i].name="invalid"
                                              /////////as first or before elements were pushing the extra term so we need to pop the last element , taking care ki jo add hua ha abhi
                                                                  ///////////// wo khud na urjae
     break;
       }


     }
     console.log("disconnect");
     console.log(socket_ids);

   });

socket.on("is_online",function(data){
console.log("checking_status");
for(var i=0;i<socket_ids.length;i++)
{  console.log("status of "+data.user)
console.log(socket_ids[i].name)
  if(socket_ids[i].name==data.user){
    console.log("matched "+data.user)


for(var j=0;j<receiver.length;j++)
{
  if(receiver[j].from==socket.id)
  {
    receiver[j].to=socket_ids[i].code
  }
  else
  {
       receiver.push({to:socket_ids[i].code,from:socket.id})
  }
}

   receiver.push({to:socket_ids[i].code,from:socket.id})
   console.log(receiver)
  socket.emit("status","online");
  break;
}

  else {
    console.log("not matched "+ data.user)
    socket.emit("status","offline");
  }

}

});

});

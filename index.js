'use strict'
//use modules here
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
//initialise app
var app = express()
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())


let token = "EAABqfz24WwEBAEzHI3iuai1pyCgmf2Syw74fwZCfW4y89kKItk4jyZCwnOXBRIUA2j95HqY2WmTlfmNJjLvw7vua537sguiBqTIQJT5ihHDIDohBwhs9nDKGIpYb8gr3LhzTjZBQ4jRBdXdAMe5Jb65kZAFzWnPLkQss8ZCPwAQZDZD"


//routes here
//get method
app.get('/',function (req,res) {
  res.send("fuck you");
})
//webhooks for facebook
app.get('/webhooks',function(req,res){
  if(req.query['hub.verify_token']==="testing"){
    res.send(req.query['hub.challenge']);
  }
  res.send("wrong token")
})
//post method
app.post('/webhook',function(req,res){
  let messaging_events = req.body.entry[0].messaging;
  for(let i=0;i<messaging_events.length;i++){
    let events =messaging_events[i];
    let sender = event.sender.id
    if(event.message&&event.message.text){
      let text = event.message.text;
      sendText(sender,text);
    }
  }
  res.sendStatus(200);
})
//sendtext function

function sendText(sender ,text) {
  let messageData = {text:text};
  request({
    url:"https://graph.facebook.com/v2.6/me/messages",
    qs:{access_token : token},
    method:"POST",
    json:{
      recipient : { id: sender},
      message : messageData
    }
    },function(error ,response ,body){
      if(error){
        console.log("sending error");
      }
      else if (response.body.error) {
        console.log("response body error");
      }
  })

}


//port activation here
app.listen(process.env.PORT||3000,function () {
  console.log("your port is listening")
});

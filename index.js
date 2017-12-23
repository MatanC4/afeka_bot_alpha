
/**
 * Created by matka on 23/12/2017.
 */

'use strict'
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

const app = express()

var token = "EAAeJc1IRQ9UBALDYWkF3ZCWmM5YSkow5MGShveLObeZA5ZABEan0IHTdVDKSa14hv7AK8BIoOyQCZAwBMleo5iOOtuesosksPU36ZBtpNYDXFfc6BNX0seZBpbWlLH7wfKfzziRtJkuKgovOkYQBcouKjMLegCZAXe8EasaBN3vxwZDZD"

app.set('port' , (process.env.PORT || 5000))

//Allows to process data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Routes
app.get('/', function(req,res){
    res.send("Hi i am a chatbot")
})

app.get('/webhook', function(req,res){
    if(req.query['hub.verify_token']=== "afeka"){
        res.send(req.query['hub.challenge'])
    }
    req.send("Wrong token")
})


app.post('/webhook/', function(req,res){
    var messaging_events = req.body.entry[0].messaging
    for (var i = 0; i< messaging_events.length; i++){
        var event = messaging_events[i]
        var sender =  event.sender.id
        if(event.message && event.message.text){
            var text = event.message.text
            sendText(sender,"text echo: " + text.substring(0,100))
        }
    }
    res,sendStatus(200)
})

function sendText(sender, text){
    var messageData = {text:text}
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs : {access_token: token},
        method: "POST",
        json:{
            receipt: {id:sender},
            message:messageData
        }
    },
    function(error, response, body) {
        if (error){
            console.log("sending error")

        }else if(response.body.error){
            console.log("response body error")
        }
    })
}

app.listen(app.get('port'),function(){
    console.log("running: port")
})
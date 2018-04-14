// git Add .
// git commit -m "test2"
//git push heroku master


/**
 * Created by matka on 23/12/2017.
 */

'use strict'
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var mHelper = require('./messagesHelper')
var _ = require('lodash')
const app = express()


app.set('port' , (process.env.PORT || 5000))

//Allows to process data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) //tells the system to use json(HTTP server)

//Routes

// default URL - home page
app.get('/', function(req,res){
    res.send("Hi i am a chatbot")
})
//Add webhook verification
// Adds support for GET requests to our webhook
app.get('/webhook', function(req,res){
    var receivedToken = _.get(req,"query.hub.verify_token", "")
    if(receivedToken === "afeka"){
        var sentToken = _.get(req,"query.hub.challenge", "")
        res.send(sentToken)
    }
    else{
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
        req.send("Wrong token")
    }

})

// receive a message from the user via fb messenger API
app.post('/webhook/', function(req,res){
    var messaging_events = _.get(req,"body.entry[0].messaging", [])

    //var messaging_events = req.body.entry[0].messaging
    for (var i = 0; i< messaging_events.length; i++){
        var event = messaging_events[i]
        var sender =  event.sender.id
        if(event.message && event.message.text){
            var text = event.message.text
            //sendGenericMessage(sender)
            mHelper.sendText(sender,text)
        }
    }
    console.log("calling sendStatus")
    res.sendStatus(200)

})



app.listen(app.get('port'),function(){
    console.log("running: port")
})
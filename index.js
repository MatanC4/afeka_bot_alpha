// git Add .
// git commit -m "test2"
//git push heroku master


//stop  process - heroku ps:scale web=0
//run process  - heroku ps:scale web=1

/**
 * Created by matka on 23/12/2017.
 */

'use strict'
var express = require('express')
var bodyParser = require('body-parser')
var mHelper = require('./messagesHelper.js')
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
// also receive an ack after we send the message back to user
app.post('/webhook/', function(req,res){
    console.log("Eliran i told you")

    var payload = _.get(req,"body.entry[0].messaging", [])
    console.log(JSON.stringify(payload))

    payload.forEach(function(item){
        var message = payload && _.get(item, "sender.message", null) //catch only messages sent from the user
        if(message){
            var sender = _.get(item,"sender.id", null)
            //var text = _.get(event, "message.text", "There seems to be an error, please send your message again")
            var text = _.get(message, "text", null)
            //console.log(text)

            if(sender && text){
                mHelper.sendText(sender,text)

                console.log("Return 200 ok")
                res.sendStatus(200)

            }
        }
    })
})



app.listen(app.get('port'),function(){
    console.log("running: port")
})
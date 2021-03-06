// git Add .
// git commit -m "test2"
//git push heroku master

//git Add . commit -m "test2" push heroku master


//stop  process - heroku ps:scale web=0
//run process  - heroku ps:scale web=1

/**
 * Created by matka on 23/12/2017.
 */

'use strict'
var express = require('express')
var bodyParser = require('body-parser')
var convHelper = require('./conversationHelper.js')
var _ = require('lodash')
//var Messenger = require('messenger-node');

var spawn = require("child_process").spawn;
var pythonProcess = spawn('python',['/Users/matka/Documents/school/Final project/afeka_bot_alpha/sentimentAnalysis/functions.py']);
//https://stackoverflow.com/questions/23450534/how-to-call-python-function-from-nodejs


/*const nlpClient = new Wit({
    accessToken: "GLAVEUNCTYGSRIW5XH46XFITF45LP2WH",
    logger: new log.Logger(log.DEBUG) // optional
});
 * Created by matka on 17/04/2018.
 */

//create express server
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
    var events = _.get(req,"body.entry[0].messaging", [])
    console.log("events:", events.length)
    console.log(JSON.stringify(events))


    events.forEach(function(event){
        var sender = _.get(event,"sender.id", null)
        //var text = _.get(event, "message.text", "There seems to be an error, please send your message again")
        var text = _.get(event, "message.text", null)
        //console.log(text)

        if(sender && text){
            var data = {
                userId: sender,
                sender: "user",
                date :_.get(event, "timestamp", null),
                message: text,
                sequence: _.get(event, "message.seq", null),
                nlpEntity: _.get(event, "message.nlp",null)
            }
            //console.log(JSON.stringify(data))
            convHelper.handleIncomingMessage(data)

            // always return 200 ok - to avoid infinite loop in fb API
            console.log("Return 200 ok")
            res.sendStatus(200)

        }
    })




    /*
    * console.log("Eliran i told you")

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
    * */
})




app.listen(app.get('port'),function(){
    console.log("running: port")
})
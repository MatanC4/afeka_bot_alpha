
/**
 * Created by matka on 23/12/2017.
 */

'use strict'
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var editDistance = require('edit-distance')

const app = express()

var token = "EAAcS0VpnflMBAL1ZB7WKvdFxPmm8YZAW4fAadmp71SXUgeZAvXa8HndBlnJOnjzQasKzqDPGZC08sMkDiHTsEyZAvchKZBPu6F4kjOgjZAZB17IAfvQSK11hNFjS7T2UDla8HfjELUKI95FvBum27nHiGPcuAY78JZChbzZBA2QRDZCHwZDZD"

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
            //sendGenericMessage(sender)
            var dist = calcEditDistance(text,"test")
            console.log("############## dist = "+ dist)
            sendText(sender,dist)
        }
    }
    console.log("calling sendStatus")
    res.sendStatus(200)

})

function sendText(sender, ){
    var messageData = {text:text}
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs : {access_token: token},
        method: "POST",
        json:{
            recipient: {id:sender},
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


/*function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}*/

function calcEditDistance(a,b){
    var stringA = a
    var stringB = b
    var insert, remove, update
    insert = remove = function(node) { return 1 }
    update = function(stringA, stringB) { return stringA !== stringB ? 1 : 0 }
    var lev = editDistance.levenshtein(stringA, stringB, insert, remove, update)
    console.log('Levenshtein', lev.distance, lev.pairs(), lev.alignment())
    return lev.distance
}


app.listen(app.get('port'),function(){
    console.log("running: port")
})
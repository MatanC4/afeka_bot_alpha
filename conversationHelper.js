/**
 * Created by matka on 28/04/2018.
 */

var NlpIntentionExtractor = require("./NlpIntentionExtractor.js")
var _ = require('lodash')
var nlpHelper = require('./nlpHelper.js')
var mHelper = require('./messagesHelper')



function analyzeUserRequest(text) {
    // get intention from Wit.ai module
     nlpHelper.getUserIntents(text).then(function (data) {
        console.log(data)
        console.log(JSON.stringify(data))
    })


    //var nlpInstructor = new NlpIntentionExtractor(nlpResult)


}

module.exports.handleIncomingMessage = function (incomingMsgData) {
    // 1. Save the incoming msg to DB
    mHelper.saveMessage(incomingMsgData).then(function () {

        // 2. analyze message content and decide about response
        //2.a get nlp result
        //2.b get nlp intent (extract the data)
        //2.c understand entity from intent
        //2.d fetch content according to user request and put in responseText
        analyzeUserRequest(incomingMsgData.message)
        var responseText = "response"


        var responseData = {
            userId: incomingMsgData.userId,
            sender: "bot",
            date : Date.now(),
            message: "response",
            sequence: null ,
            //nlpEntity: _.get(dtObj, "nlpEntity",null),
            //refToUserMsg: _.get(dtObj,"messageId",null)
        }

        //3. save response to DB
        mHelper.saveMessage(responseData).then(function(){
            //4.send response back to the user
            mHelper.respondToUser(responseData)
        }).catch(function () {
            console.log("error returning from respond to user")
        })
    })

}


module.exports.analyzeUserRequest = analyzeUserRequest



/*
 {
 "_text": "send me the rules of exams abd sexual harrassment",
 "entities": {
    "intent": [
    {
        "confidence": 1,
        "value": "protocol_request",
        "type": "value"
    }
 ],
  "protocol_type": [
 {
 "confidence": 1,
 "value": "exams",
 "type": "value"
 },
 {
 "confidence": 1,
 "value": "הטרדה מינית",
 "type": "value"
 }
 ]
 },
 "msg_id": "0ekF8XUeTnQY2bdMW"
 }
*/

/**
 * Created by matka on 28/04/2018.
 */

var NlpIntentionExtractor = require("./NlpIntentionExtractor.js")
var _ = require('lodash')
var nlpHelper = require('./nlpHelper.js')
var mHelper = require('./messagesHelper')




function analyzeUserRequest(text) {

    var result = {
        text: "Seems AfekaBot is now studying for" +
        " end of semester exams.. sorry cant help right now",
        pathToFirebaseResponse: null,
        confidentValue: null
    }

    // get intention from Wit.ai module
    return nlpHelper.getUserIntents(text).then(function (data) {
        console.log(data)
        console.log(JSON.stringify(data))
         var intention = new NlpIntentionExtractor(data)

         switch(true){
             case intention.isDisplaySpecificMenu:
                 result.text = "I understand you wish to talk about "+ data.intent
                 result,pathToFirebaseResponse =  "menu/"+ data.intent
                 break
             case intention.isAnswerExist:
                 result.text = "Here is what you requested: "
                 result,pathToFirebaseResponse =  "content/"+ data.intent + "/"+ data.entity
                 break

             case intention.isMissMatch:
                 result.text  = "I Understand you wish to get xxx however i cant find proper answer at the moment " +
                     "please try again later"
                 break
             case intention.isShouldLearn:
                 result.text = "I understand you wish to talk about "+ data.intent +
                         "related to " + data.entity +
                         "However, im not 100% sure, gonna need your help on this one.."
                 result,pathToFirebaseResponse =  "menu/"+ data.intent
                 result.confidentValue = data.confidentValue
                 break
             case intention.isDisplayGeneralMenu:
                 result.text = "ohh im not really sure what you wish to talk about "
                 result,pathToFirebaseResponse =  "menu/general"
                 break
             default:
                 result.text =  "Seems AfekaBot is now studying for" +
                     " end of semester exams.. sorry cant help right now"
         }
         return Promise.resolve(result)
    }).catch(function(err){
        console.log("Got an error in analyzeUserRequest from getUserIntents")
        console.log(err)
        return Promise.reject(result)
    })

}

module.exports.handleIncomingMessage = function (incomingMsgData) {
    // 1. Save the incoming msg to DB
    mHelper.saveMessage(incomingMsgData).then(function () {
            console.log("I am in handleIncomingMessage")
        // 2. analyze message content and decide about response
        //2.a get nlp result
        //2.b get nlp intent (extract the data)
        //2.c understand entity from intent
        //2.d fetch content according to user request and put in responseText
        analyzeUserRequest(incomingMsgData.message).then(function (result) {
            postNLPAnalyze({
                userId:incomingMsgData.userId,
                message:""
            })
            if(result.pathToFirebaseResponse){
                if(confidentValue){

                }
                mHelper.fetchAnswerCompletionFromDB(data).then(function (answerResult) {
                   // prepare the answer based on the answerResult.Intent (all intwnt types) and pass to postNLPAnalyze
                    //use switch case
                    postNLPAnalyze({
                        userId:incomingMsgData.userId,
                        message:""
                    })
                })
            }else{
                postNLPAnalyze({
                    userId:incomingMsgData.userId,
                    message:result.text
                })
            }

        }).catch(function(errorResult){
            postNLPAnalyze({
                userId:incomingMsgData.userId,
                message: errorResult.text
            })
        })
    })

}

function postNLPAnalyze(data){
    var responseData = {
        userId: data.userId,
        sender: "bot",
        date : Date.now(),
        message: data.message,
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

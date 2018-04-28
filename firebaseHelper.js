/**
 * Created by matka on 14/04/2018.
 */

var admin = require('firebase-admin');
var mHelper = require('./messagesHelper.js')
var serviceAccount = require("./afekabot-f5a94-firebase-adminsdk-jalex-b6e9d5e146.json");

//initiate the firebase instance, with app AfekaBot credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://afekabot-f5a94.firebaseio.com"
});




/*
admin.initializeApp({
    apiKey: "AIzaSyBh0WuRk1BdK8ptpAS1JEFeiKGjskgMmnY",
    authDomain: "afekabot-f5a94.firebaseapp.com",
    databaseURL: "https://afekabot-f5a94.firebaseio.com",
    projectId: "afekabot-f5a94",
    storageBucket: "afekabot-f5a94.appspot.com",
    messagingSenderId: "1002150442373"
})*/

module.exports.saveMessageToConversation = function(data) {
    console.log(JSON.stringify("enetered saveMessageToConversation"))
    var messagegRef = admin
        .database()
        .ref("userConversation")
        .child(data.userId)
        .push()

    data.messageId = messagegRef.key
    console.log(JSON.stringify("Got ID", data.messageId))
    return messagegRef.update(data)
}
/*return messagegRef.update(data).then(function(res){

    if(data.sender === "user"){
        var sender = data.sender
        mHelper.sendText(sender,data.message,data)
        console.log("#############  Bot response was saved:")
        //console.log(JSON.stringify(res))
    }


    // how to return result from promise
    console.log("user conversation was updated:")
    console.log(JSON.stringify(res))

})
}*/




module.exports.saveBotResponse = function(data){

    var messagegRef = admin
        .database()
        .ref("userConversation")
        .child(data.userId)
        .push()

    data.messageId = messagegRef.key

    messagegRef.update(data).then(function(res){
        if(data.sender === "user"){
            var sender = data.sender
           mHelper.sendText(sender,data.message,data)
            console.log("#############  Bot response was saved:")
            //console.log(JSON.stringify(res))
        }

        // how to return result from promise
        console.log("user conversation was updated:")
        console.log(JSON.stringify(res))

    })
}

/*
 [{"sender":{"id":"1721073544644202"},"recipient":{"id":"1872968486296824"},"timestamp":1523708162689,"message":{"mid":"mid.$cAAandFxFMG1o9Vq6gVixBVyDIiJm","seq":82481,"text":"שוב","nlp":{"entities":{}}}}]

**/

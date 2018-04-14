/**
 * Created by matka on 14/04/2018.
 */

var admin = require('firebase-admin');


// initiate the firebase instance, with app AfekaBot credentials
admin.initializeApp({
    apiKey: "AIzaSyBh0WuRk1BdK8ptpAS1JEFeiKGjskgMmnY",
    authDomain: "afekabot-f5a94.firebaseapp.com",
    databaseURL: "https://afekabot-f5a94.firebaseio.com",
    projectId: "afekabot-f5a94",
    storageBucket: "afekabot-f5a94.appspot.com",
    messagingSenderId: "1002150442373"
})

module.exports.saveMessageToConversation = function(data){

    admin.database().ref("userConversation").child(data.userId).update(data).then(function(res){
        console.log("user conversation was updated:")
        console.log(JSON.stringify(res))

    })
}


/*
 [{"sender":{"id":"1721073544644202"},"recipient":{"id":"1872968486296824"},"timestamp":1523708162689,"message":{"mid":"mid.$cAAandFxFMG1o9Vq6gVixBVyDIiJm","seq":82481,"text":"שוב","nlp":{"entities":{}}}}]

**/

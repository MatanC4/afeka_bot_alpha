var request = require('request')
var _ = require('lodash')
var dbHelper = require('./firebaseHelper.js')

//Facebook messenger auth token
var token =  "EAAeJc1IRQ9UBAOEwclBtnB15A0TqrAlAuiXvCBLG9CZAOkZCeN6nF6YyxY5SySbBcKrfBHn32ieuXKZA9vWZB2bZCcQrLWwwsEaE7Bw1yAZCXBrJ09dLkWBpUWHuhAdvSPEZCW0gzUamMQKOZBifZAHxso6jtrwGdXjjdPEvhh8PnxAZDZD"


module.exports.saveMessage =  function(data) {
    // save incoming msg from user to DB and
   return dbHelper.saveMessageToConversation(data).then(function(res){
        console.log("user conversation was updated:")
        console.log(JSON.stringify(res))
       return Promise.resolve(res)
    }).catch(function (err) {
        console.log("Promise Rejected" , err);
        return Promise.reject(err)
    });
}


module.exports.respondToUser =  function(data){
    // execute http request to send message to user
   return request({
            url: "https://graph.facebook.com/v2.6/me/messages",
            qs : {access_token: token},
            method: "POST",
            //request payload
            json:{
                recipient: {id: data.userId},
                message: {text: data.responseText}
            }
        },
        // implement the request result callback
        function(err, res, body) {
            if (err){
                console.log("Sending response to user has failed",err)
            }else if(res.body.error){
                console.log("Response body error -  sending message to user failed: " + res.body.error.message)
            }else{
                // success
                return Promise.resolve(res)
            }
            return Promise.reject(err || res.body.error)
        }.catch(function () {
            
        }))
}




module.exports.token = token
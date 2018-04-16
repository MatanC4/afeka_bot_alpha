var request = require('request')


//Facebook messenger auth token
var token =  "EAAeJc1IRQ9UBAOEwclBtnB15A0TqrAlAuiXvCBLG9CZAOkZCeN6nF6YyxY5SySbBcKrfBHn32ieuXKZA9vWZB2bZCcQrLWwwsEaE7Bw1yAZCXBrJ09dLkWBpUWHuhAdvSPEZCW0gzUamMQKOZBifZAHxso6jtrwGdXjjdPEvhh8PnxAZDZD"


module.exports.sendText =  function(sender,text,dtObj){
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
                console.log("response body error: " + response.body.error.message)
            }else{
                var data = {
                    userId: sender,
                    sender: "bot",
                    date : Date.now(),
                    message: text,
                    sequence: null ,
                    nlpEntity: _.get(dtObj, "nlpEntity",null),
                    refToUserMsg: _.get(dtObj,"messageId",null)
                }

                dbHelper.saveMessageToConversation(data)

            }
        })
}




module.exports.token = token
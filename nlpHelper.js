
var _ = require('lodash')
const {Wit, log} = require('node-wit');

const nlpClient = new Wit({
    accessToken: "GLAVEUNCTYGSRIW5XH46XFITF45LP2WH",
    logger: new log.Logger(log.DEBUG) // optional
});
 //Created by matka on 17/04/2018.


module.exports.getUserIntents = function(text){
   return nlpClient.message(text, {})
        .then((data) => {
            console.log('##  Yay, got Wit.ai response: ' + JSON.stringify(data));
            return Promise.resolve(data)
        })
        .catch(function (err) {
            console.log("Error while fetching from Wit.ai:",err)
            return Promise.reject(err)
        })

}




module.exports.nlpClient = nlpClient

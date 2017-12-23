
/**
 * Created by matka on 23/12/2017.
 */

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

const app = express()

app.set('port' , (process.env.PORT || 5000))

//Allows to process data
app.use(bodyParser.urlencoded({extended: flase}))
app.use(bodyParser.json())

//Routes
app.get('/', function(req,res){
    res.send("Hi i am a chatbot")
})

app.get('/webhook', function(req,res){
    if(req,query['hub.verify_token']=== ""){
        res.send(req.query['hub.challenge'])
    }
    req.send("Wrong token")
})


app.listen(app.get('port'),function(){
    console.log("running: port")
})
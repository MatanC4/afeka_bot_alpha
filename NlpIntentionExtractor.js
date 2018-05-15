/**
 * Created by matka on 28/04/2018.
 */
var _ = require('lodash')

class NlpIntentionExtractor{


    constructor(data){
        this.intent = null
        this.protocol_type = null
        this.phone_number = null
        // add the rest of intents here


        this.extractData(data)
    }

    extractData(data) {
        //extract all data from data.entities
        var entities = _.get(data,"entities", {})
        // get the data keys -  such as intent, protocol_type etc
        var intents = Object.keys(entities)
        intents.forEach(function (intentType) {
            //init all variables needed for the extractor and populate with possible value from response
            // in fact call relevant function for each key, pass the relevant value(entities[intentType])
            this[intentType] = this["handle_"+intentType](entities[intentType])


        })
    }

    handle_intent(data){
        return _.get(data,"entities.intent",null)
    }

    handle_protocol_type(data){
        return _.get(data,"entities.protocol_type",null)
    }
    // add function for the rest of the intents

}
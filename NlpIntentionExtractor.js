/**
 * Created by matka on 28/04/2018.
 */
var _ = require('lodash')
const CONFIDENCE_BAR = 0.75

const INTENT_CATEGORIES = {
    protocol: "protocol",
    mail:"mail",
    phone:"phone"
}

const INTENT_CATEGORIES_TYPES = {
    protocol: {
        exams: "exams",
        libary: "library"
    }
    // continue to the rest
}
class NlpIntentionExtractor{


    constructor(data){
        this.extractData(data)
    }

    extractData(data) {
        //extract all data from data.entities
        var entities = _.get(data,"entities", {})
        var intent = _.get(data,"entities.intent", null)
        // figure out if we got the users intention
/*
"entities":{
 "protocol": [
 {
 "confidence": 0.82466214918918,
 "value": "exams",
 "type": "value"
 }
 ],
 "intent": [
 {
 "confidence": 1,
 "value": "protocol",
 "type": "value"
 }]
 }
 */


        if (intent){
            var intentCategory = _.get(intent,"value", null)
            if(intentCategory && entities[intentCategory]){
                var categoryType = entities[intentCategory]

                // handle unrecognized content
                if(categoryType.value === "true"){
                    // typeValue.value !== "true" - when NLP doesnt know the context we receive value = true (means nothing)
                    // return to user - menu or request to send question again clearer
                    this.isDisplaySpecificMenu = true
                    this.intent = intentCategory
                    return
                }

                if(categoryType.confidence >= CONFIDENCE_BAR ){
                    // i figured out what user wants

                    if(INTENT_CATEGORIES[intentCategory] && INTENT_CATEGORIES_TYPES[categoryType.value]){
                        // fetch request from DB
                        this.isAnswerExist = true
                        this.intent = intentCategory
                        this.entity = categoryType.value
                        return

                    }else{
                        console.log("There s a missmatch in my config and wit.ai")
                        // return to user - request to re submit a clearer question
                        this.isMissMatch = true

                        return
                    }
                }else{
                    this.isShouldLearn = true
                    this.confidentValue = categoryType.confidence
                    this.intent = intentCategory
                    this.entity = categoryType.value
                    return

                    // return to user - menu or request to send question again clearer
                    // !!!!!!! we need to add a new format  - learning mechanism
                    // here we will also tell the user we are checking if we need to learn this phrase
                }
            }
        }else{
            if(Object.keys(entities).length > 0){
                // need to understand what intentCategory we received and in what confidence and answer accordignly:
                // "i understnad you iwsh to talk about exams, but what would you like to do?"
                this.isDisplayGeneralMenu = true

                if(Object.keys(entities).length === 1) {
                    var permittedCategories = Object.keys(INTENT_CATEGORIES)
                    var res = permittedCategories.find(function (category) {
                        return Object.keys(entities)[0] === category
                    })
                    if (res) {
                        this.entity = Object.keys(entities)[0]
                        // mention to user we know the entity he mentioned and present general menu
                    }
                    return
                }
            }else{
                // entititirs obj is empty
                // we didnt get the user intent, we return the general menu to the user
                this.isDisplayGeneralMenu = true
                return
            }
        }

        /*var requestedContent = Object.keys(entities)
        requestedContent.forEach(function (intentType) {
            //init all variables needed for the extractor and populate with possible value from response
            // in fact call relevant function for each key, pass the relevant value(entities[intentType])
            this[intentType] = this["handle_"+intentType](entities[intentType])


        })*/
    }


}
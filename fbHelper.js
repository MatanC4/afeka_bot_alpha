/**
 * Created by matka on 08/05/2018.
 */

const Messenger = require('messenger-node');


let client_config = {
    'page_token': 'EAAeJc1IRQ9UBAE8d9OD0qZAFI0ZBigZCGZCP03Hx7uYPi36KZCrZBlSGJZApSm8fawqSQcLQunFGtZBwtEaJsdnRLinNC34BAsISbIRXVImZBU9UURF0fTrVa5ctVrXlZCE6JPYg3NZBZBDZA1DOhEe8afbZBd2l7SOHrYwOdCbt4mTDeVhzlKKZArTbR01dYFXXndKggJgYoKqwzCq3QZDZD',
    'app_token': '2121453228082133|7CO96VUnUv2-AbjNU1Yf08EZOlE',
    'api_version': 'v2.11'
}

const Client = new Messenger.Client(client_config);

// PSID of the user
let psid = '1721073544644202'

// profile fields to retrieve
let fields = ['id', 'first_name', 'last_name', 'profile_pic']

Client.getUserProfile(psid, fields)
    .then(res => {
        // log the api response
        console.log(res);
    })
    .catch(e)
{
    console.error(e);
}
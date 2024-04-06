const { initializeApp } = require('firebase-admin/app');
// const fb = initializeApp();
const appRoot = require("app-root-path");
const { getMessaging } = require('firebase-admin/messaging');
var admin = require("firebase-admin");

var serviceAccount = appRoot.require("/firebase/fcm-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function sendNotif(notification, token)
{
    // This registration token comes from the client FCM SDKs.
    const registrationToken = 'YOUR_REGISTRATION_TOKEN';

    const message = {
    data:{title:'yaya'},
    notification:{title:notification, body:"Your meal could be in Jeopardy"},
    token:token
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    getMessaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });

}

module.exports= {sendNotif}




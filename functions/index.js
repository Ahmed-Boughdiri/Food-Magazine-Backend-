const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
    apiKey: "AIzaSyCeux7stATTFyPU7pugF7Ko9bCRKWfbmMo",
    authDomain: "food-magazine-6e38c.firebaseapp.com",
    databaseURL: "https://food-magazine-6e38c.firebaseio.com",
    projectId: "food-magazine-6e38c",
    storageBucket: "food-magazine-6e38c.appspot.com",
    messagingSenderId: "367169216825",
    appId: "1:367169216825:web:b7e68a9e5802516b8b88e8",
    measurementId: "G-0Z14QWEXY7"
})

// Create a user Record

exports.CreateUser = functions.https.onRequest((request, response) =>{
    const userInfo = request.body.user;
    return admin.database().ref(userInfo.id).set(userInfo);
});

// Deleting a User

exports.DeleteUser = functions.auth.user().onDelete(user =>{
    return admin.database().ref(user.uid).remove();
})

// get The Favourites List

exports.getFavourites = functions.https.onRequest((request,response) =>{
    id = request.body.uid;
    admin.database().ref(id).on("value", snap =>{
        const data = snap.val();
        return data.favourites
    })
})
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
    return admin.database().ref(id).on("value", snap =>{
        const data = snap.val();
        response.send(data.favourites)
    });
})

// Put in The Favourites List

exports.PutInFavourites = functions.https.onRequest((request,response) =>{
    const recipe = request.body.recipe;
    const id = request.body.uid;
    return admin.database().ref(id).on("value", snap =>{
        const data = snap.val();
        const currentFavourites = data.favourites;
        return admin.database().ref(id).update({
            favourites: currentFavourites.concat(recipe)
        })
    });
})

// Remove From Favourites 

exports.RemoveFromFavourites = functions.https.onRequest((request,response) =>{
    const id = request.body.uid;
    const favouritesList = request.body.favourites;
    const foodName = request.body.foodName;
    let favs = [];
    favouritesList.map(fav =>{
        if(fav.name !== foodName){
            favs.push(fav)
        }
    })
    return admin.database().ref(id).update({
        favourites: favs
    })
})
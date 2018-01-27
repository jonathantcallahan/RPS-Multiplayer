var config = {
    apiKey: "AIzaSyAhXlCqRsh2hXa0M5EMggfWX0sNsfHP-II",
    authDomain: "rps-multiplayer-b00d5.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-b00d5.firebaseio.com",
    projectId: "rps-multiplayer-b00d5",
    storageBucket: "rps-multiplayer-b00d5.appspot.com",
    messagingSenderId: "46073764810"
  };

firebase.initializeApp(config);

var database = firebase.database()
var connected = database.ref(".info/connected")
var connectionsRef = database.ref("/connections")
var permKey;
var userName = prompt("enter username")

if(!userName){
    userName = "Anonymous User"
}

connected.on("value",function(response){
    var user = connectionsRef.push({
        entry: "test entry",
        name: userName
    })

    user.onDisconnect().remove
})

connectionsRef.on("child_added",function(response){
    key = response.key;
    name = response.val().name;
    console.log(name)
    var p = $("<p>")
    p.attr("key", key)
    p.text(name)
    console.log(response.val())
    $("#available-opponents").append(p)
})

connectionsRef.once("value",function(response){
    permKey = key;
    console.log(permKey)
})


var user = database.ref("/connections/" + key)
console.log(user)
user.on("value",function(snapshot){
    console.log(snapshot.val())
}, function(errData){
    console.log("Error")
})



function setWinner(){

    if((userOneChoice === "rock") && (userTwoChoice === "paper")){
        $("#results").text("User Two Wins")
        console.log("test game ran")
    }
    if((userOneChoice === "rock") && (userTwoChoice === "scissors")){
        $("#results").text("User One Wins")
    }
    if((userOneChoice === "paper") && (userTwoChoice === "scissors")){
        $("#results").text("User Two Wins")
    }
    if((userOneChoice === "paper") && (userTwoChoice === "rock")){
        $("#results").text("User One Wins")
    }
    if((userOneChoice === "scissors") && (userTwoChoice === "rock")){
        $("#results").text("User Two Wins")
    }
    if((userOneChoice === "scissors") && (userTwoChoice === "paper")){
        $("#results").text("User One Wins")
    }
    if(userOneChoice === userTwoChoice){
        $("results").text("Users Tied")
    }
 
  }

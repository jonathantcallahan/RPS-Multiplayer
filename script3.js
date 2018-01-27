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
var users = database.ref("users")
var tempKey;
var permKey;

var userName = prompt("enter username")
if(!userName){
    userName = "Anonymous User"
}

connected.on("value",function(response){
    connectionsRef.push({
        entry: "test entry",
    })
})

connectionsRef.on("child_added",function(response){
    var key = response.key;
    tempKey = key;
    console.log(key)
})

connectionsRef.once("value",function(response){
    var firebaseArrayLen = response.val();
    console.log(firebaseArrayLen)
    permKey = tempKey;
    console.log(permKey)
    var p = $("<p>")
    p.text
    users.ref(userName).set({
        key: permKey
    })

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

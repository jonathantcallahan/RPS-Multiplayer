var config = {
    apiKey: "AIzaSyAhXlCqRsh2hXa0M5EMggfWX0sNsfHP-II",
    authDomain: "rps-multiplayer-b00d5.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-b00d5.firebaseio.com",
    projectId: "rps-multiplayer-b00d5",
    storageBucket: "rps-multiplayer-b00d5.appspot.com",
    messagingSenderId: "46073764810"
  };
  firebase.initializeApp(config);

var userOneSelected = false;
var userTwoSelected = false;
var userOneChoice;
var userTwoChoice;
var database = firebase.database();
var chat = database.ref("chat");
var playerOneChoice = database.ref("player-one-choice");
var playerTwoChoice = database.ref("player-two-choice")
playerOneChoice.on("value",got1Data,err1Data)
playerTwoChoice.on("value",got2Data,err2Data)
chat.on("value",gotChatData,errChatData)

function got1Data(data){
    userOneSelected = true;
    console.log("tessstttt")
    var userChoice = data.val()
    console.log("user choice" + userChoice)
    var keys = Object.keys(userChoice)
    console.log("keys" + keys)
    var key1 = keys[0];
    var finalChoice = userChoice[key1].choice;
    console.log(finalChoice)
    $("#user-one-choice").text(finalChoice)
    playerOneChoice.remove()
    console.log(userTwoSelected)
}

function got2Data(data){
    userTwoSelected = true;
    console.log("tessstttt")
    var userChoice = data.val()
    console.log("user choice" + userChoice)
    var keys = Object.keys(userChoice)
    console.log("keys" + keys)
    var key1 = keys[0];
    var finalChoice = userChoice[key1].choice;
    console.log(finalChoice)
    $("#user-two-choice").text(finalChoice)
    playerTwoChoice.remove()
}

function err1Data(data){
    console.log("error data")
    console.log(data)
}

function err2Data(data){
    console.log("error data")
    console.log(data)
}

$("#chat-input").click(function(){
    $(this).val("")
})

$("#enter").click(function(){
    var message = $("#chat-input").val()
    console.log(message)
    var userInput = {
        message: message
    }
    chat.push(userInput)
    console.log(userInput)
})

function gotChatData(data){
    var chatLog = data.val();
    console.log(chatLog)
    var keys = Object.keys(chatLog)
    console.log(keys)
    $("#chat-box").empty();
    for(var i = 0; i < keys.length; i++){
        var keyIndex = keys[i];
        var chatEntry = chatLog[keyIndex].message;
        console.log(chatEntry)
        var p = $("<p>")
        p.text(chatEntry)
        $("#chat-box").append(p)
    }
}

function errChatData(data){
    console.log(data);
    console.log("Error")
}

$("#clear-chat").click(function(){
    console.log(chat)
    chat.remove();
})

  $(".choice").click(function(){
    var choice = $(this).attr("id")
    console.log(userOneSelected)
    if(!userOneSelected){
        userOneChoice = choice;
        
        console.log(userOneSelected)
        var userChoice = {
            choice: choice,
        }
        playerOneChoice.push(userChoice)
    }else if(!userTwoSelected){
        userTwoChoice = choice;
        console.log("test 2")
        var userChoice = {
            choice: choice,
        }
        playerTwoChoice.push(userChoice)
        setWinner();
    }
  })

  function setWinner(){
    if((userOneChoice === "rock") && (userTwoChoice === "paper")){
        $("#results").text("User One Wins")
        console.log("test")
    }
    if((userOneChoice === "rock") && (userTwoChoice === "scissors")){
        $("#results").text("User Two Wins")
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


  //var ref = database.ref('scores')
  //ref.on("value", gotData, errData)
  //var score = 0;

//function gotData(data){
//    $("#score-display").html("");
//    console.log("got data")
//    var scores = data.val();
//    console.log(scores)
//    var keys = Object.keys(scores);
//    console.log(keys)
//    for(var i = 0; i < keys.length; i++){
//        var keyIndex = keys[i];
//        var initials = scores[keyIndex].name;
//        var score = scores[keyIndex].score;
//        console.log(initials, score)
//        var p = $("<p>")
//        p.text(initials + score)
//        $("#score-display").append(p)
//    }
//}
//
//function errData(err) {
//    console.log("error")
//    console.log(err)
//}
//
//
//  $("#submit").click(function(){
//      submitScore()
//  })
//
//
//  function submitScore() {
//    var data = {
//        name: $("#initials").val(),
//        score: score
//    }
//
//    var ref = database.ref('scores')
//    console.log(data)
//    ref.push(data)
//  }
//
//
//
//  $("#click").click(function(){
//    score++;
//    $("#score").text(score)
//})
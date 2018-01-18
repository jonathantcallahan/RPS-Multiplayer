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
playerOneChoice.on("value",got1Data,err1Data)
chat.on("value",gotChatData,errChatData)

function got1Data(data){
    console.log("tessstttt")
    var userChoice = data.val()
    console.log("user choice" + userChoice)
    var keys = Object.keys(userChoice)
    console.log("keys" + keys)
    var key1 = keys[0];
    var finalChoice = userChoice[key1].choice;
    console.log(finalChoice)
}

function err1Data(data){
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
        userOneSelected = true;
        console.log(userOneSelected)
        var userChoice = {
            choice: choice,
        }
        playerOneChoice.push(userChoice)
        
        $("#user-one-choice").text(choice)
    }else if(!userTwoSelected){
        userTwoChoice = choice;
        userTwoSelected = true;
        $("#user-two-choice").text(choice);
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



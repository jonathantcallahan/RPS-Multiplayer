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
var playerTwoChoice = database.ref("player-two-choice");
var gameOver = database.ref("game-over")
let newChoice1;
let newChoice2;
gameOver.on("value",
    function(snapshot){
        gameIsOver = snapshot.val().gameStatus
        if(gameIsOver === true){
            $("#user-one-choice").text("User one chose " + newChoice1)
            $("#user-two-choice").text("User two chose " + newChoice2)
        } else {
            return;
        }
    },
    function(errData){
        console.log("Error retrieving data")
    })
playerOneChoice.on("value",
    function(snapshot){
        console.log(snapshot.val().choice)
        userOneSelected = true;
        newChoice1 = snapshot.val().choice
    },
    function(snapshot){
        console.log("error")
    })
playerTwoChoice.on("value",
    function(snapshot){
        newChoice2 = snapshot.val().choice
    },
    function(snapshot){
        console.log("error")
    })
chat.on("value",gotChatData,errChatData)



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
        playerOneChoice.set({
            choice: choice,
        })
    }else if(!userTwoSelected){
        userTwoChoice = choice;
        console.log("test 2")
        playerTwoChoice.set({
            choice: choice,
        })
        gameOver.set({
            gameStatus: true;
        })
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

  $("#reset-game").click(function(){
      playerOneChoice.remove();
      playerTwoChoice.remove();
  })


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
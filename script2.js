var config = {
    apiKey: "AIzaSyAhXlCqRsh2hXa0M5EMggfWX0sNsfHP-II",
    authDomain: "rps-multiplayer-b00d5.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-b00d5.firebaseio.com",
    projectId: "rps-multiplayer-b00d5",
    storageBucket: "rps-multiplayer-b00d5.appspot.com",
    messagingSenderId: "46073764810"
  };
  firebase.initializeApp(config);

$(".rps-image").click(function(){
    if(userOneSelected || userTwoSelected){
        return;
    }
    $(this).addClass("clicked-image");
})

$("#chat-input").click(function(){
    $(this).val("")
})

var userOneSelected = false;
var userTwoSelected = false;
var isUserOne = false;
var userOneChoice;
var userTwoChoice;
var database = firebase.database();
var chat = database.ref("chat");
var playerOneChoice = database.ref("player-one-choice");
var playerTwoChoice = database.ref("player-two-choice");
var gameOver = database.ref("game-over")
let newChoice1;
let newChoice2;
var userName = prompt("Enter your username")



gameOver.set({
    gameStatus: false,
})



gameOver.on("value",
    function(snapshot){
        gameIsOver = snapshot.val().gameStatus
        if(gameIsOver === true){
            setWinner();
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
        console.log(snapshot.val())
        if(snapshot.val()){ 
        console.log("player one selectedd")
        userOneSelected = true;
        newChoice1 = snapshot.val().choice
        } else {
            return;
        }
    },
    function(snapshot){
        console.log("error")
    })
playerTwoChoice.on("value",
    function(snapshot){
        if(snapshot.val()){
            console.log("recieved user two choice data")
        newChoice2 = snapshot.val().choice
        } else {
            return;
        }
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
    if((message === "Enter your message here!") || (message === "")){
        alert("You need to enter a message first!")
        return;
    }
    console.log(message)
    var userInput = {
        message: (userName + " : " + message)
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
        p.text(chatEntry).addClass("chat-entry")
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
    var clearChat = {
        message: " "
    }
    chat.push(clearChat)

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
        isUserOne = true;
    }else if((!userTwoSelected) && (!isUserOne)) {
        userTwoChoice = choice;
        userTwoSelected = true;
        console.log("test 2")
        playerTwoChoice.set({
            choice: choice,
        })
        gameOver.set({
            gameStatus: true,
        })
    }
  })

  function setWinner(){
      console.log("set winner ran")
      console.log(userOneChoice, userTwoChoice)
      userOneChoice = newChoice1;
      userTwoChoice = newChoice2;
      console.log(userOneChoice, userTwoChoice)
    if((userOneChoice === "rock") && (userTwoChoice === "paper")){
        $("#results").text("User One Wins")
        console.log("test game ran")
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
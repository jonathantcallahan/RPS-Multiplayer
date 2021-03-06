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
var userName = prompt("Please enter a username for the in-game chat:")

gameOver.set({
    gameStatus: false,
})

playerOneChoice.remove();
playerTwoChoice.remove();


$(".rps-image").click(function(){
    if(userOneSelected){
        return;
    }
    if(userTwoSelected){
        return;
    }
    $(this).addClass("clicked-image");
    console.log()
})

$("#chat-input").click(function(){
    $(this).val("")
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
    }
)

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
    }
)

playerTwoChoice.on("value",
    function(snapshot){
        if(snapshot.val()){
            console.log("recieved user two choice data")
            newChoice2 = snapshot.val().choice
            userTwoSelected = true;
        } else {
            return;
        }
    },
    function(snapshot){
        console.log("error")
    }
)

chat.on("value",gotChatData,errChatData)

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

$("#chat-input").click(function(){
    $(this).val("")
})

$("#enter").click(function(){
    enterChat();
})

$("#chat-input").keydown(function(event){
    if(event.keyCode === 13){
        enterChat()
        $(this).val("")
    }
})

function enterChat(){
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

  $("#reset-game").click(function(){
      playerOneChoice.remove();
      playerTwoChoice.remove();
  })
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function(){
  if(!started){
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(event){
  var userChosenColor = event.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    $("body").addClass("game-over").removeClass(setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200));
    $("#level-title").text("Game Over, Press Any Key to REstart");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    startOver();
  }
}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("#level-title").text(`Level ${level}`);
}

function playSound(name){
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed").removeClass(setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100));
}

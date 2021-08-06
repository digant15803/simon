var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function() {
    if (!started) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function nextSequence(){
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    $("h1").text("Level " + level);
}

$(".btn").click(function handler(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var aud = new Audio("sounds/" + name + ".mp3");
    aud.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");

    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


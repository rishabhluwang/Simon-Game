alert("Welcome to the Simon Game! please check how to play the game first ");

function playIntro(){
  var audio = new Audio("sounds/intro.mp3")
  audio.play();
}

$("h1").css("color","yellow");

var buttonsColor=["red", "green","blue","yellow"];


var gamePattern=[];
var userClickedPattern=[];

var started = false;

var level =0;

$(document).keypress(function(){
  if(!started){
    nextSequence();
    started=true;
  }
})

$(".btn").click(function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      $("#level-title").text("Game Over! Press any key to start");
      var audio = new Audio("sounds/dilwale.mp3")
      audio.play();
      $("body").addClass("game-over");

      $(document).keypress(function(){
            $("body").removeClass("game-over");
          audio.pause();
      })

      startOver();

    }

}

function startOver(){
  level =0;
  gamePattern =[];
  started =false;
}




function nextSequence(){
userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber =Math.random()*4;
  randomNumber=Math.floor(randomNumber);
  var randomChosenColor =buttonsColor[randomNumber];
gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);


}


let x;
let level = 0;
let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
function nextSequence() {
    userClickedPattern = [];
     x = Math.floor(Math.random() * 4);
     let randomChosenColour= buttonColours[x];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
level++;
}
function handler()
{
    $(".btn").on("click", function(){
        let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        //if(userClickedPattern.length===gamePattern.length)
        checkAnswer(userClickedPattern.length-1 );
        //checkAnswer(userChosenColour);
    });
}
handler();
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
let f= false;
$(document).on("keyup", function() {
    if(!f){
    nextSequence();
$("#level-title").text("Level " + level);
    f=true;
    }
});
function startOver() {
    level = 0;
    gamePattern = [];
    f = false;
    z= true;
}
let z=true;
function checkAnswer(currentLevel) {
   /* for(let i=0; i<currentLevel+1; i++){
    if (gamePattern[i] !== userClickedPattern[i]) {
        z=false;
        break;
    }
    else {
        }
}
    if(z){
        setTimeout(function() {
            nextSequence();
            $("#level-title").text("Level " + level);
            userClickedPattern = [];
        }, 1000);
    }*/
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        
        setTimeout(function () {
            $("#level-title").text("Level " + level);
          nextSequence();
        }, 1000);
         
      }
    }
    else{
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        userClickedPattern = [];
        startOver();
    }
}


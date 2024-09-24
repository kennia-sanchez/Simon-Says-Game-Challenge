var buttonColours = ["red", "blue", "green", "yellow"]; 
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Initialize the game with a keyboard key
$(document).keypress(function(event){
    if (!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Check when the bottons are press and save it in the array (userClickedPattern)
$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// Random number between 0-3
function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

// Function to play each sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate when someone click a button
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function for checking the colours
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                console.log("correct");
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}

// Reset the game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).one("keypress", nextSequence);




function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);  
    level++

    $("h1").text("level " + level);

    $('#'+ randomChosenColor).fadeOut(100).fadeIn(100);

    var beep = new Audio('./sounds/' + randomChosenColor + '.mp3');
    beep.play();
}





$('.btn').click(function(event){
    var userChosenColor = event.target.getAttribute("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);



    /*CONDITION FOR THE NEXT LEVEL*/
    if(gamePattern.length === userClickedPattern.length){
        console.log(gamePattern);
        console.log(userClickedPattern);

        if (level >= 1 && gamePattern.join() === userClickedPattern.join()){
            userClickedPattern = [];
            setTimeout(nextSequence, 1000)
        }
    }

    else {
        for(c=0;  c < userClickedPattern.length; c++){
            if (gamePattern[c] !== userClickedPattern[c]){
                $("h1").text("GAME OVER");
                $("body").addClass("game-over");
                var wrong = new Audio("./sounds/wrong.mp3");
                wrong.play();
                $(".last").after("<h2 class='reloadText'>Reload the page to play again!</h2>");
            }
        }
    }
    
});






function playSound(name){
    var hitSound = new Audio('./sounds/' + name + '.mp3');
    hitSound.play();
}






function animatePress(currentColor){
    var chosenButton = $("#" + currentColor);

    chosenButton.addClass("pressed");

    setTimeout(function(){
        chosenButton.removeClass("pressed");
    }, 70);
}



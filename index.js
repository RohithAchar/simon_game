var userPattern = [];
var comPattern = [];
var colors = ["red","green","blue","yellow"];
var level = 0;
var start = false;

const startButton = $("#any_key");
function hideStartButton(){
    startButton.addClass('hide-button');
}
function enableStartButton(){
    startButton.removeClass('hide-button');
}

$(document).keypress(function(){
    hideStartButton();
    if(!start){
        start = true;
        nextSequence();
    }
});
startButton.click(function(e){
    hideStartButton();
    start = true;
    nextSequence();
});
// $(document).on("tap",function(){
//     if(!start){
//         start = true;
//         nextSequence();
//     }
// });
$(".btn").click(function(){
    id = $(this).attr("id");
    userPattern.push(id);
    animateClick(id);
    playSound(id);
    validate((userPattern.length)-1);
});

function validate(currentIndex){
    if(start){
        if(userPattern[currentIndex] === comPattern[currentIndex]){
            if(userPattern.length === comPattern.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        }
        else{
            playSound("wrong");
            restart();
        }
    }  
}
function animateClick(id){
    $("#"+id).addClass("activeButton");
    setTimeout(function(){
        $("#"+id).removeClass("activeButton");
    },100);
}
function nextSequence(){
    userPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var color = colors[randomNumber];
    comPattern.push(color);
    $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
}

function restart(){
    level = 0;
    start = false;
    userPattern = [];
    comPattern = [];
    $("body").css("background-color","red");
    $("#level-title").text("Game over");
    setTimeout(function(){
        enableStartButton();
        $("body").css("background-color","#011F3F");
        $("#level-title").text("Press any KEY to start the game");
    },1000);
}
function playSound(sound){
    var audio = new Audio("sounds/"+sound+".mp3");
    audio.play();
}

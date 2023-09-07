var userPattern = [];
var comPattern = [];
var colors = ["red","green","blue","yellow"];
var level = 0;
var start = false;

$(document).keypress(function(){
    if(!start){
        start = true;
        nextSequence();
    }
});
$("#any_key").click(function(){
    if(!start){
        start = true;
        nextSequence();
    }
});
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
            console.log("Called start");
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
    console.log("Entered start");
    level = 0;
    start = false;
    userPattern = [];
    comPattern = [];
    $("body").css("background-color","red");
    $("#level-title").text("Game over");
    setTimeout(function(){
        $("body").css("background-color","#011F3F");
        $("#level-title").text("Press any KEY to start the game");
    },1000);
}
function playSound(sound){
    var audio = new Audio("sounds/"+sound+".mp3");
    audio.play();
}

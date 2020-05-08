buttonColours = ["red","blue","green","yellow"];
gamePattern = [];
userClickedPattern = [];
var isPlaying = false;
var level = 0;
$(document).keydown(function(){
  if(!isPlaying)
  {
    isPlaying = true;
    // $("#level-title").text("Level " + level);
    nextSequence();
  }
})

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },1000);
}

function checkAnswer(currentLevel)
{
  console.log("User : " + userClickedPattern);
  console.log("Game : " + gamePattern);
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log(userClickedPattern[currentLevel]);
    console.log("Success");
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    startOver();
  }
}

function startOver()
{
  level = 0;
  gamePattern = [];
  isPlaying = false;
}

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence()
{
  var randomNumber = Math.floor(Math.random()*(3)) + 1
  //console.log(randomNumber);
  level++;
  $("#level-title").text("Level " + level);
  var randomColor = buttonColours[randomNumber];
  gamePattern.push(randomColor);
  console.log("Game Pattern : " + randomColor);
  $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

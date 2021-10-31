const buttonColours = ['red','blue','green','yellow']
let gamePattern = []
let userClickedPattern = []
let level = 0
let start = false;
//Next level/sequence
nextSequence = () => {
    const randomNumber = Math.round(Math.random() * 3);
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    level ++
    $('h1').text('Level '+ level)
}
// When user clicks on a color
$('.btn').click((e)=>{
    let userChosenColour = $(e.target).attr('id')
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
    
})
// play color sound function
playSound = (name) => {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}
// When user clicks color, highlighted
animatePress = (currentColour) => {
    $(`#${currentColour}`).addClass('pressed')
    setTimeout(() => {
        $(`#${currentColour}`).removeClass('pressed')
    }, 100);
}
//Start Game
$(document).keypress((e)=>{
    if (e.key === 'a' && start === false) {
        nextSequence()
        start = true
    }
})
// Check Solution
checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
        setTimeout(() => {
            nextSequence();
        }, 1000);
        userClickedPattern = []
    }} else {
        $('body').addClass('game-over')
    setTimeout(() => {
        $(`body`).removeClass('game-over')
    }, 200);
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $('h1').text('Game Over, Press A Key to Restart')
    startOver()
    }
}

//Restart Game

startOver = () => {
    gamePattern = []
    userClickedPattern = []
    level = 0
    start = false
}
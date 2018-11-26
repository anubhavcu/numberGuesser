/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max), //for making it random
    guessesLeft = 3;

//ui elements
const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');
// console.log(game, minNum, maxNum, guessBtn, guessInput, message);
// console.log(guessBtn);

//assign UI min and max 
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener 
//since the play-again class in entered dynamically we have to  use event delegation
game.addEventListener('mousedown', function(e) {
    //we have used mousedown as click reloads the page immediately.
    if (e.target.className === 'play-again') {
        window.location.reload();

    }
})

//listen for guess
guessBtn.addEventListener('click', function() {
    //we get the number evenif we convert using JSON.parse but will return a error if i/p field is empty which in other case returns NaN
    // const guess1 = JSON.parse(guessInput.value);
    // console.log(guess1);
    let guess = parseInt(guessInput.value);

    //validate

    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(` Please enter a number between ${min} and ${max} `, 'red');
    } else {

        //check if won
        if (guess === winningNum) {
            //game over -won
            //disable input
            // guessInput.disabled = true;
            // //change the border to green
            // guessInput.style.borderColor = 'green';
            // setMessage(`${winningNum} is correct, You win !`, 'green');
            gameOver(true, `${winningNum} is correct, You win !`)
        } else {
            //wrong number guess 
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                //game over -lost 
                //disable input
                // guessInput.disabled = true;
                // //change the border to green
                // guessInput.style.borderColor = 'red';
                // setMessage(`You lost, the correct number was ${winningNum}`, 'red');
                gameOver(false, `You lost !, the correct number was ${winningNum}.`)

            } else {
                //game continues -answer wrong
                guessInput.style.borderColor = 'red';
                //clear the input 
                guessInput.value = '';
                setMessage(`${guess} guess is not correct. No. of guesses left ${guessesLeft}`, 'red')
            }

        }
    }



});

//game over
// we are defining same function for lose & win case as they are almost same
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;

    //change the border to green
    //as we are doing lose and win in same function we have to pass different colors 
    guessInput.style.borderColor = color;

    setMessage(msg, color);

    //Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';


}

//winning num
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


//Set Message 
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}
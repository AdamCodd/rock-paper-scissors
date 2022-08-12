/********  Game Logic  *********/
const playChoice = ['ROCK', 'PAPER', 'SCISSORS'];
let playerSelection = '';
let computerSelection = '';

let playerScore = 0;
let computerScore = 0;
let resultPlay = '';

function computerPlay() {
    return (() => playChoice[Math.floor(Math.random() * 3)])();
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        resultPlay = "Draw! The computer used " + computerSelection + " too!";
    }
    else if ((playerSelection === "PAPER" && computerSelection === "ROCK") ||
        (playerSelection === "SCISSORS" && computerSelection === "PAPER") ||
        (playerSelection === "ROCK" && computerSelection === "SCISSORS")) {
        ++playerScore;
        resultPlay = "You win! Your " + playerSelection + " beats " + computerSelection;
    }
    else if ((computerSelection === "PAPER" && playerSelection === "ROCK") ||
        (computerSelection === "SCISSORS" && playerSelection === "PAPER") ||
        (computerSelection === "ROCK" && playerSelection === "SCISSORS")) {
        ++computerScore;
        resultPlay = "You lose! Your " + playerSelection + " was beaten by " + computerSelection;
    }
    return resultPlay;
}

/********  Game UI  *********/

// Showing card of the player 
const allChoices = document.querySelectorAll("#three-choices li");
const playerCards = document.querySelectorAll('.player-selection li');
const computerCards = document.querySelectorAll('.computer-selection li');
const warning = document.querySelector('.warning');

function showChoice(cards) {
    return function (e) {
        cards.forEach(card => card.classList.remove('visible'));
        let choice;

        if (cards === playerCards) {
            warning.classList.remove('visible');
            choice = e.currentTarget.getAttribute('title');
            playerSelection = choice.toUpperCase();
            document.querySelector(`.${choice}-player`).classList.add('visible');
        }

        else if (cards === computerCards) {
            // Warning if no card was selected
            if (playerSelection === '') {
                warning.innerHTML = "You must choose a card before playing the game!";
                warning.classList.add('visible');
                return;
            }
            computerSelection = computerPlay();
            playRound(playerSelection, computerSelection);

            choice = computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1).toLowerCase();
            document.querySelector(`.${choice}-computer`).classList.add('visible');
            playerSelection == '';
            updateScore();
        }
    }
}

function updateScore() {
    document.querySelector('.computer-score').innerHTML = `Score: <strong>${computerScore}</strong>`;
    document.querySelector('.player-score').innerHTML = `Score: <strong>${playerScore}</strong>`;
    // Display the score then the winner of each turn. When one reaches 5 the game stops.
    if (resultPlay.includes('win')) {
        document.querySelector('.result-game').innerHTML = `<p class="win-game">${resultPlay}</p>`;
    }
    if (resultPlay.includes('lose')) {
        document.querySelector('.result-game').innerHTML = `<p class="lose-game">${resultPlay}</p>`;
    }
    if (resultPlay.includes('Draw')) {
        document.querySelector('.result-game').innerHTML = `<p class="draw-game">${resultPlay}</p>`;
    }

    if (computerScore === 5 || playerScore === 5) {
        playButton.setAttribute('disabled', '');
        document.querySelector('.reset').style.cssText = 'display:initial !important';
        if (computerScore > playerScore) {
            document.querySelector('.end-game').innerHTML = `<p class="lose-game">Sorry! The computer won. Click on reset to replay.</p>`;
        }
        else if (playerScore > computerScore) {
            document.querySelector('.end-game').innerHTML = `<p class="win-game">Great! You won the game. Click on reset to replay.</p>`;
        }
    }
}

allChoices.forEach(item => {
    item.addEventListener('click', showChoice(playerCards));
})

const playButton = document.querySelector(".replay");
playButton.addEventListener('click', showChoice(computerCards));

function reset() {
    playerScore = 0;
    computerScore = 0;
    resultPlay = '';
    playerSelection = '';
    computerSelection = '';
    playButton.disabled = false;

    document.querySelector('.reset').style.cssText = 'display:none !important';
    document.querySelector('.end-game').innerHTML = '';
    document.querySelector('.result-game').innerHTML = '';
    document.querySelector('.computer-score').innerHTML = '';
    document.querySelector('.player-score').innerHTML = '';

    playerCards.forEach(cardp => cardp.classList.remove('visible'));
    computerCards.forEach(cardc => cardc.classList.remove('visible'));
}

// Reset the game: remove the score and cards
const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', reset);
// Game Logic

let playerSelection;
let computerSelection;
let playChoice = ['ROCK', 'PAPER', 'SCISSORS'];

function computerPlay() {
    return playChoice[Math.floor(Math.random() * 3)];
}

let playerScore = 0;
let computerScore = 0;
let resultPlay = '';

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        resultPlay = "Draw! The computer used " + computerSelection + " too!";
    }
    if ((playerSelection === "PAPER" && computerSelection === "ROCK") ||
        (playerSelection === "SCISSORS" && computerSelection === "PAPER") ||
        (playerSelection === "ROCK" && computerSelection === "SCISSORS")) {
        ++playerScore;
        resultPlay = "You win! Your " + playerSelection + " beats " + computerSelection;
    }
    if ((computerSelection === "PAPER" && playerSelection === "ROCK") ||
        (computerSelection === "SCISSORS" && playerSelection === "PAPER") ||
        (computerSelection === "ROCK" && playerSelection === "SCISSORS")) {
        ++computerScore;
        resultPlay = "You lose! Your " + playerSelection + " was beaten by " + computerSelection;
    }
    return resultPlay;
}

// Game UI

// Reset button
document.querySelector('.reset').style.display = "none";

// Showing card of the player 
let allChoices = document.querySelectorAll("#three-choices li");
allChoices.forEach(item => {
    if (item) {
        item.addEventListener('click', () => {
            playerSelection = item.getAttribute('title').toUpperCase();

            if (item.getAttribute('title') === "Rock") {
                document.querySelector('.Rock-player').classList.add('visible');
                document.querySelector('.Paper-player').classList.remove('visible');
                document.querySelector('.Scissors-player').classList.remove('visible');
                document.querySelector('.warning').classList.remove('visible');
            }

            if (item.getAttribute('title') === "Paper") {
                document.querySelector('.Paper-player').classList.add('visible');
                document.querySelector('.Rock-player').classList.remove('visible');
                document.querySelector('.Scissors-player').classList.remove('visible');
                document.querySelector('.warning').classList.remove('visible');
            }

            if (item.getAttribute('title') === "Scissors") {
                document.querySelector('.Scissors-player').classList.add('visible');
                document.querySelector('.Rock-player').classList.remove('visible');
                document.querySelector('.Paper-player').classList.remove('visible');
                document.querySelector('.warning').classList.remove('visible');
            }
        })

    }
})

// Showing computer card + Scores (until 5) then the winner.
let playButton = document.querySelector(".replay");
playButton.addEventListener('click', () => {
    computerSelection = computerPlay();
    playRound(playerSelection, computerSelection);
    if (playerSelection) {
        document.querySelector('.player-score').classList.add('visible');
        document.querySelector('.computer-score').classList.add('visible');

        if (computerSelection === "ROCK" && playerSelection) {
            document.querySelector('.Rock-computer').classList.add('visible');
            document.querySelector('.Paper-computer').classList.remove('visible');
            document.querySelector('.Scissors-computer').classList.remove('visible');
        }

        if (computerSelection === "PAPER" && playerSelection) {
            document.querySelector('.Paper-computer').classList.add('visible');
            document.querySelector('.Rock-computer').classList.remove('visible');
            document.querySelector('.Scissors-computer').classList.remove('visible');
        }

        if (computerSelection === "SCISSORS" && playerSelection) {
            document.querySelector('.Scissors-computer').classList.add('visible');
            document.querySelector('.Rock-computer').classList.remove('visible');
            document.querySelector('.Paper-computer').classList.remove('visible');
        }
    }
    else {
        document.querySelector('.warning').innerHTML = "You must choose a card before playing the game!";
        document.querySelector('.warning').classList.add('visible');
    }

    //Update score
    document.querySelector('.computer-score').innerHTML = `Score: <strong>${computerScore}</strong>`;
    document.querySelector('.player-score').innerHTML = `Score: <strong>${playerScore}</strong>`;

    if (computerScore < 5 && playerScore < 5) {

        if (resultPlay.includes('win')) {
            document.querySelector('.result-game').innerHTML = `<p class="win-game">${resultPlay}</p>`;
        }
        if (resultPlay.includes('lose')) {
            document.querySelector('.result-game').innerHTML = `<p class="lose-game">${resultPlay}</p>`;
        }
        if (resultPlay.includes('Draw')) {
            document.querySelector('.result-game').innerHTML = `<p class="draw-game">${resultPlay}</p>`;
        }
    }
    else {
        playButton.setAttribute('disabled', '');
        document.querySelector('.reset').style.cssText = 'display:initial !important';
        if (computerScore > playerScore) {
            document.querySelector('.end-game').innerHTML = `<p class="lose-game">Sorry! The computer won. Click on reset to replay.</p>`;
        }
        else if (playerScore > computerScore) {
            document.querySelector('.end-game').innerHTML = `<p class="win-game">Great! You won the game. Click on reset to replay.</p>`;
        }
    }
})

// Reset the game: remove the score and cards

let resetButton = document.querySelector(".reset");

resetButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    resultPlay = '';
    playerSelection = '';

    playButton.disabled = false;
    document.querySelector('.reset').style.cssText = 'display:none !important';

    document.querySelector('.end-game').innerHTML = '';
    document.querySelector('.result-game').innerHTML = '';
    document.querySelector('.computer-score').innerHTML = '';
    document.querySelector('.player-score').innerHTML = '';

    document.querySelector('.Rock-player').classList.remove('visible');
    document.querySelector('.Paper-player').classList.remove('visible');
    document.querySelector('.Scissors-player').classList.remove('visible');

    document.querySelector('.Rock-computer').classList.remove('visible');
    document.querySelector('.Paper-computer').classList.remove('visible');
    document.querySelector('.Scissors-computer').classList.remove('visible');

    document.querySelector('.player-score').classList.remove('visible');
    document.querySelector('.computer-score').classList.remove('visible');
})
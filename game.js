// Game Logic


//let promptSelection = prompt('Rock, Paper or Scissors?');
//let playerSelection = promptSelection.charAt(0).toUpperCase() + promptSelection.slice(1).toLowerCase();

let playerSelection;
let playChoice = ['ROCK', 'PAPER', 'SCISSORS'];
let computerSelection = computerPlay();

function computerPlay() {
    return playChoice[Math.floor(Math.random() * 3)];
}

let playerScore = 0;
let computerScore = 0;

function playRound(playerSelection, computerSelection) {
    let resultPlay = '';
    if (playerSelection === computerSelection) {
        resultPlay = "Draw! The computer used " + computerSelection + " too!";
    }
    if ((playerSelection === "PAPER" && computerSelection === "ROCK") ||
        (playerSelection === "SCISSORS" && computerSelection === "PAPER") ||
        (playerSelection === "ROCK" && computerSelection === "SCISSORS")) {
        playerScore++;
        resultPlay = "You win! Your " + playerSelection + " beats " + computerSelection;
    }
    if ((computerSelection === "PAPER" && playerSelection === "ROCK") ||
        (computerSelection === "SCISSORS" && playerSelection === "PAPER") ||
        (computerSelection === "ROCK" && playerSelection === "SCISSORS")) {
        computerScore++;
        resultPlay = "You lose! Your " + playerSelection + " was beaten by " + computerSelection;
    }
    return resultPlay;
}
// Play once when the player click on "play"
//playRound(playerSelection, computerSelection);


// UI

let allChoices = document.querySelectorAll("#three-choices li");
allChoices.forEach(item => {
    if (item) {
        item.addEventListener('click', () => {
            playerSelection = item.getAttribute('title').toUpperCase();

            if (item.getAttribute('title') === "Rock") {
                document.querySelector('.Rock-player').classList.add('visible');
                document.querySelector('.Paper-player').classList.remove('visible');
                document.querySelector('.Scissors-player').classList.remove('visible');
            }

            if (item.getAttribute('title') === "Paper") {
                document.querySelector('.Paper-player').classList.add('visible');
                document.querySelector('.Rock-player').classList.remove('visible');
                document.querySelector('.Scissors-player').classList.remove('visible');
            }

            if (item.getAttribute('title') === "Scissors") {
                document.querySelector('.Scissors-player').classList.add('visible');
                document.querySelector('.Rock-player').classList.remove('visible');
                document.querySelector('.Paper-player').classList.remove('visible');
            }
            console.log(playerSelection);
        })

    }
})

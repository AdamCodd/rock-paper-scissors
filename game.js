// Game Logic


//let promptSelection = prompt('Rock, Paper or Scissors?');
//let playerSelection = promptSelection.charAt(0).toUpperCase() + promptSelection.slice(1).toLowerCase();

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
            console.log(playerSelection);
        })

    }
})

let playButton = document.querySelector(".replay");
playButton.addEventListener('click', () => {
    computerSelection = computerPlay();
    playRound(playerSelection, computerSelection);
    if (!playerSelection) {
        document.querySelector('.warning').innerHTML = "You must choose a card before playing the game!";
        document.querySelector('.warning').classList.add('visible');
    }
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
    console.log(resultPlay);
    //document.querySelector('.result-game').innerHTML += resultPlay + '\n';
    if (resultPlay.includes('win')) {
        document.querySelector('.result-game').innerHTML += `<p class="win-game">${resultPlay}</p>`;
    }
    if (resultPlay.includes('lose')) {
        //document.querySelector('.result-game').classList.add('lose-game');
        document.querySelector('.result-game').innerHTML += `<p class="lose-game">${resultPlay}</p>`;
    }
    if (resultPlay.includes('Draw')) {
        //document.querySelector('.result-game').classList.add('draw-game');
        document.querySelector('.result-game').innerHTML += `<p class="draw-game">${resultPlay}</p>`;
    }
})
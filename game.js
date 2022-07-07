let playChoice = ['Rock', 'Paper', 'Scissors'];
let promptSelection = prompt('Rock, Paper or Scissors?');
let playerSelection = promptSelection.charAt(0).toUpperCase() + promptSelection.slice(1).toLowerCase();

let computerSelection = computerPlay();

function computerPlay() {
    let randomChoice = Math.floor(Math.random() * 3);
    return playChoice[randomChoice];
}

function playRound(playerSelection, computerSelection) {
    let resultPlay;
    if (playerSelection === computerSelection) {
        return resultPlay = "Draw! The computer used " + computerSelection + " too!";
    }
    else if ((playerSelection === "Rock" && computerSelection === "Paper") || 
    (playerSelection === "Scissors" && computerSelection === "Rock") || 
    (playerSelection === "Paper" && computerSelection === "Scissors")) 
    {
        return resultPlay = "You lose! " + computerSelection + " beats your " + playerSelection;
    }
    else {
        return resultPlay = "You win! Your " + playerSelection + " beats " + computerSelection;
    }
}
// Play once
playRound(playerSelection, computerSelection);
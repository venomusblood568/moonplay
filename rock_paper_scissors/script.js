const choices = ['rock','paper','scissors']
const resultDiv = document.getElementById('result')
const player_score_span = document.getElementById('player-score')
const computers_score_span = document.getElementById('computer-score')

let player_score = 0
let computer_score = 0

document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => {
        const player_choice = button.dataset.choice // Corrected to 'choice' not 'choices'
        playGame(player_choice)
    })
})

function playGame(player_choice){
    const computer_choice = choices[Math.floor(Math.random() * choices.length)]
    const result = get_result(player_choice,computer_choice);
    update_score(result)
    display_result(player_choice,computer_choice,result)
    animate_result(result)
}

function get_result(player, computer){
    if(player === computer){
        return 'It\'s a tie!!'
    }
    if( 
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock')  ||
        (player === 'scissors' && computer === 'paper')  
    ){
        return 'Human you win!!'
    }
    else{
        return 'You lost human!!'
    }
}

function update_score(result){
    if(result === 'Human you win!!'){ // Match the exact string
        player_score++;
        player_score_span.textContent = `Player: ${player_score}`
    }
    else if(result === 'You lost human!!'){ // Match the exact string
        computer_score++;
        computers_score_span.textContent = `Computer: ${computer_score}`
    }
}

function display_result(player, computer, result){
    resultDiv.innerHTML = `
    <p>You chose <strong>${player}</strong></p><br>
    <p>Computer chose <strong>${computer}</strong></p><br>
    <p><strong>${result}</strong></p>
    `
}

function animate_result(result){
    resultDiv.style.animation = 'none';
    void resultDiv.offsetWidth;
    resultDiv.style.animation = 'fadeIn 0.5s ease-out';

    if(result !== 'It\'s a tie!!'){ // Match the exact string
        const winnerSpan = result === 'Human you win!!' ? player_score_span : computers_score_span
        winnerSpan.style.animation = 'none'
        void winnerSpan.offsetWidth;
        winnerSpan.style.animation = 'shake 0.5s ease-in-out';
    }
}
// Add this function to your existing code
function resetGame() {
    player_score = 0;
    computer_score = 0;
    
    // Reset the score displays
    player_score_span.textContent = `Player: ${player_score}`;
    computers_score_span.textContent = `Computer: ${computer_score}`;
    
    // Clear the result display
    resultDiv.innerHTML = '<br><p>Game has been reset!</p><br>';
    
    // Optionally, you can also reset any animations
    resultDiv.style.animation =  '0.5s ease-out-in';
    player_score_span.style.animation = 'none';
    computers_score_span.style.animation = 'none';
}

// Example of how to use this reset function
// Assuming you have a reset button with id 'reset-button'
document.getElementById('reset-button').addEventListener('click', resetGame);


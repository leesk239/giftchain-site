let score = 0;
let isGameActive = false;
let timer;
let timeLeft = 15;

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('gift-box').addEventListener('click', clickGiftBox);

function startGame() {
    score = 0;
    timeLeft = 15;
    isGameActive = true;
    document.getElementById('score').textContent = 'Score: ' + score;
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('timer').textContent = 'Time left: ' + timeLeft + 's';

    timer = setInterval(updateTimer, 1000);
    setTimeout(endGame, 15000);
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('timer').textContent = 'Time left: ' + timeLeft + 's';
    }
}

function clickGiftBox() {
    if (isGameActive) {
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
        document.getElementById('gift-box').src = 'giftboxopen.png';
        setTimeout(() => {
            document.getElementById('gift-box').src = 'giftbox.png';
        }, 200);
    }
}

function endGame() {
    isGameActive = false;
    document.getElementById('start-button').style.display = 'block';
    clearInterval(timer);
    alert('Game over! Your final score is: ' + score);
    saveHighScore(score);
    displayHighScores();
}

function saveHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores.splice(10); // Keep only top 10 scores
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const scoreList = document.getElementById('score-list');
    scoreList.innerHTML = highScores.map((score, index) => `<li>${index + 1}. ${score}</li>`).join('');
}

// Display high scores on page load
displayHighScores();

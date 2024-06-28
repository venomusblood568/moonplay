document.addEventListener('DOMContentLoaded', function() {
    const player = document.querySelector(".player");
    const gameFrame = document.querySelector(".game-frame");
    const scoreDisplay = document.querySelector(".score-count");

    const gameFrameRect = gameFrame.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    let playerX = playerRect.left - gameFrameRect.left;
    let playerY = playerRect.top - gameFrameRect.top;
    let score = 0;
    
    function updatePlayerPosition() {
        player.style.left = playerX + 'px';
        player.style.top = playerY + 'px';
    }

    function createFood() {
        const food = document.createElement('div');
        food.classList.add('food');

        const maxX = gameFrameRect.width - 20; // Adjusted for food size
        const maxY = gameFrameRect.height - 20; // Adjusted for food size
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        food.style.left = randomX + 'px';
        food.style.top = randomY + 'px';


        gameFrame.appendChild(food);
    }

    function checkCollision() {
        const food = document.querySelector('.food');
        if (!food) return;

        const foodRect = food.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (
            playerRect.left < foodRect.left + foodRect.width &&
            playerRect.right > foodRect.left &&
            playerRect.top < foodRect.top + foodRect.height &&
            playerRect.bottom > foodRect.top
        ) {
            food.remove();
            createFood();
            score++;
            scoreDisplay.textContent = "Score count : " + score;        }
    }


    document.addEventListener('keydown', function(event) {
        const step = 10;

        switch(event.key) {
            case 'ArrowUp':
                if (playerY > 0) {
                    playerY -= step;
                    updatePlayerPosition();
                }
                break;
            case 'ArrowDown':
                if (playerY < gameFrameRect.height - playerRect.height) {
                    playerY += step;
                    updatePlayerPosition();
                }
                break;
            case 'ArrowLeft':
                if (playerX > 0) {
                    playerX -= step;
                    updatePlayerPosition();
                }
                break;
            case 'ArrowRight':
                if (playerX < gameFrameRect.width - playerRect.width) {
                    playerX += step;
                    updatePlayerPosition();
                }
                break;   
        }
        checkCollision();
    });

    
    createFood();
    updatePlayerPosition();
});

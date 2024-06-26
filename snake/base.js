document.addEventListener('DOMContentLoaded',function(){
    const player = document.querySelector(".player");
    const gameFrame = document.querySelector(".game-frame")
    const grameFrameReact = gameFrame.getBoundingClientRect()
    const playerRect = player.getBoundingClientRect()

    let playerX = playerRect.left -grameFrameReact.left;
    let playerY = playerRect.top -grameFrameReact.top;

    function updatePlayerPosition(){
        player.style.left = playerX + 'px'
        player.style.top = playerY + 'px'
    }

    document.addEventListener('keydown',function(event){
        const step = 10;

        switch(event.key){
            case 'ArrowUp':
                if(playerY > 0){
                    playerY -= step;
                    updatePlayerPosition();
                }
                break;
            case 'ArrowDown':
                if(playerY < grameFrameReact.height - playerRect.height){
                    playerY += step;
                    updatePlayerPosition();
                }
                break;
            case 'ArrowLeft':
                if(playerX > 0){
                    playerX -= step;
                    updatePlayerPosition();
                }
                break; 
            case 'ArrowRight':
                if(playerX < grameFrameReact.height - playerRect.height){
                    playerX += step;
                    updatePlayerPosition();
                }
                break;   
        }
    })
})
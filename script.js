
const playerFactory = (name, mark) => {
    let active = false;
    return {
        name,
        mark, 
        active
    };
}


const game = (() => {

    const startGameBtn = document.querySelector("#start-game");  
    
    // const player1Name = document.querySelector("#player1").value;
    // const player2Name = document.querySelector("#player2").value;

    const formDiv = document.querySelector("#submit-players");
    const boardDiv = document.querySelector("#board-container");
    const currentPlayerDiv = document.querySelector("#current-player");
    const gameWinDiv = document.querySelector("#game-win");

    const player1 = playerFactory("Player 1", "X");
    const player2 = playerFactory("Player 2", "O");

    startGameBtn.addEventListener("click", () => {        
       
        const player1Name = document.querySelector("#player1").value;
        const player2Name = document.querySelector("#player2").value;
        player1.name = player1Name;
        player2.name = player2Name;

            formDiv.style.visibility = "hidden";  
            startGameBtn.style.visibility = "hidden"; 

            gameBoard.renderBoard();
            boardDiv.style.visibility = "visible";
            currentPlayerDiv.style.visibility = "visible";
            currentPlayerDiv.textContent = `Current player: ${player1.name}`;
            
            player1.active = true;

            //playGame();
                    
            
            
        })
        
     
        
        function playGame() {
            
            let winningTurn = gameBoard.checkWin();
            let currentPlayer = getCurrentPlayer();
            if (winningTurn) {
                currentPlayerDiv.style.visibility = "hidden";
               gameWinDiv.textContent = `${currentPlayer.name} wins!`;
            } else if { // RIPARTI DA QUI
                //ELSE IF GAME IS A TIE
                //ELSE SWITCH PLAYER
            
            
                //switchPlayer();
            }
        
        }

        function switchPlayer() {
            if (player1.active) {
                player1.active = false;
                player2.active = true;
                currentPlayerDiv.textContent = `Current player: ${player2.name}`;
            } else {
                player2.active = false;
                player1.active = true;
                currentPlayerDiv.textContent = `Current player: ${player1.name}`;
            }
        }

        function getCurrentMark() {
            return (player1.active) ? player1.mark : player2.mark;
            
        }

        function getCurrentPlayer() {
            return (player1.active) ? player1 : player2;
        }
        
        
    return {
        startGameBtn, getCurrentMark, switchPlayer, playGame
    }
})();



const gameBoard = (() => {
    const board = ["", "", "", 
                    "", "", "",
                    "", "", ""];

    const winningCombos = [   [0, 1, 2], [3, 4, 5], [6, 7, 8],
                        [0, 3, 6], [1, 4, 7], [2, 5, 8],
                        [0, 4, 8], [2, 4, 6] 
                    ];
    
    
    const tiles = document.querySelectorAll(".tile"); 
    
    
    tiles.forEach((tile) => {
        tile.addEventListener("click", () => {
            const currentMark = game.getCurrentMark();

        fillBoard(tile.id, currentMark);
           tile.textContent = currentMark;
        //    checkWin();
        //    game.switchPlayer(); 
            game.playGame();
                   
        });
    });
    
    function fillBoard(tileId, mark) {
        board.splice(tileId, 1, mark);
        
    }
    function renderBoard() {
        for (let i = 0; i < board.length; i++) {
            var id = i;
            tile = document.getElementById(id)
            tile.textContent = board[i];
            
        }
    }

    function checkWin() {   
        const currentMark = game.getCurrentMark();
         
           return winningCombos.some(combo => combo.every(idx => {
              return board[idx] === currentMark;

            }));          
          
       
    }
    return {
        board,
        renderBoard,
        winningCombos,
        checkWin
    }
})();


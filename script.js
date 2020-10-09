
const playerFactory = (name, mark) => {
    let active = false;
    return {
        name,
        mark, 
        active
    };
}


const game = (() => {    
    // selectors  divs          
    const formDiv = document.querySelector("#submit-players");
    const formFields = document.querySelector("form");
    const boardDiv = document.querySelector("#board-container");
    const gameControlDiv = document.querySelector("#game-control");
    const player1NameDiv = document.querySelector("#player1");
    const player2NameDiv = document.querySelector("#player2");
    const playAgainBtn = document.querySelector("#play-again");
    
    // selectors btns
    const startGameBtn = document.querySelector("#start-game"); 
    const nextChoiceDiv = document.querySelector("#next-choice-btns");
    const exitBtn = document.querySelector("#exit");
         

    // create players
    const player1 = playerFactory("Player 1", "X");
    const player2 = playerFactory("Player 2", "O");  
    
    startGameBtn.addEventListener("click", () => {     
        setNames();
        loadBoard();    
    })

    playAgainBtn.addEventListener("click", () => {
        gameBoard.resetBoard();
        nextChoiceDiv.style.visibility = "hidden";
        loadBoard();
    });

    exitBtn.addEventListener("click", () => {
        gameBoard.resetBoard();
        boardDiv.style.visibility = "hidden";
        gameControlDiv.style.visibility = "hidden";
        nextChoiceDiv.style.visibility = "hidden";
        formDiv.style.visibility = "visible";  
    })
        
    function setNames() {
        const player1Name = player1NameDiv.value;
        const player2Name = player2NameDiv.value;
        player1.name = player1Name;
        player2.name = player2Name;
    }

    function loadBoard() {
        formDiv.style.visibility = "hidden";  

        gameBoard.renderBoard();

        boardDiv.style.visibility = "visible";
        gameControlDiv.style.visibility = "visible";
        gameControlDiv.textContent = `Current player: ${player1.name}`;
        formFields.reset();

        player1.active = true;
        player2.active = false;
    }
    
    function playGame() {        
        let winningTurn = gameBoard.checkWin();
        let currentPlayer = getCurrentPlayer();
        if (winningTurn) {
            gameControlDiv.textContent = `${currentPlayer.name} wins!`
            nextChoiceDiv.style.visibility = "visible";
            } else if (gameBoard.boardFull())  { 
            gameControlDiv.textContent = `This game is a tie!`;
            nextChoiceDiv.style.visibility = "visible";
            } else {
            switchPlayer();
            } 
    }

    function switchPlayer() {
        if (player1.active) {
            player1.active = false;
            player2.active = true;
            gameControlDiv.textContent = `Current player: ${player2.name}`;
        } else {
            player2.active = false;
            player1.active = true;
            gameControlDiv.textContent = `Current player: ${player1.name}`;
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
        game.playGame();                   
        });
    });
    
    function fillBoard(tileId, mark) {
        board.splice(tileId, 1, mark);        
    }

    function resetBoard() {
        board.fill("");
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

    function boardFull() {
        return board.every((tile) => { return tile != ""});
    }

    return { board, renderBoard, winningCombos, checkWin, boardFull, resetBoard }
})();


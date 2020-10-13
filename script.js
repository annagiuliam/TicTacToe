
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
    const nextChoiceDiv = document.querySelector("#next-choice-btns");
    const pcCheckbox = document.querySelector("#computer");
    let pcSelected;
    
    // selectors btns
    const startGameBtn = document.querySelector("#start-game");     
    const exitBtn = document.querySelector("#exit");
    const playAgainBtn = document.querySelector("#play-again");    

    // create players
    const player1 = playerFactory("Player 1", "X");
    const player2 = playerFactory("Player 2", "O");  
    
    //listeners
    startGameBtn.addEventListener("click", () => {   
        pcSelected = pcCheckbox.checked;        
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
        player1.name = player1NameDiv.value;
        if (pcSelected) {
            player2.name = "Computer";
        } else {
            player2.name = player2NameDiv.value;
        }    
    }

    function loadBoard() {
        formDiv.style.visibility = "hidden";  

        gameBoard.renderBoard();

        boardDiv.style.visibility = "visible";
        nextChoiceDiv.style.visibility = "visible";
        gameControlDiv.style.visibility = "visible";
        gameControlDiv.textContent = `Current player: ${player1.name}, mark: ${player1.mark}`;
        formFields.reset();

        player1.active = true;
        player2.active = false;
    }
    
    function playGame() {          
        checkGameStatus();
        makePcMove();             
    }

    function checkGameStatus() {
        let currentPlayer = getCurrentPlayer();
         if (gameBoard.checkWin()) {
            gameControlDiv.textContent = `${currentPlayer.name} wins!`;
        } else if (gameBoard.boardFull())  { 
            gameControlDiv.textContent = `This game is a tie!`;
        } else {
            switchPlayer();             
        }  
    }

    function makePcMove() {
        currentPlayer = getCurrentPlayer();

        if (pcSelected && currentPlayer === player2) {                
            setTimeout(function(){gameBoard.setPcMove();}, 1000);
            setTimeout(function(){checkGameStatus(currentPlayer);}, 1500);
        }  
        
    }

    function switchPlayer() {
        if (player1.active) {
            player1.active = false;
            player2.active = true;
            gameControlDiv.textContent = `Current player: ${player2.name}, mark: ${player2.mark}`;
        } else {
            player2.active = false;
            player1.active = true;
            gameControlDiv.textContent = `Current player: ${player1.name}, mark: ${player1.mark}`;
        }
    }

    function getCurrentMark() {
        return (player1.active) ? player1.mark : player2.mark;
        
    }

    function getCurrentPlayer() {
        return (player1.active) ? player1 : player2;
    }           
        
    return { getCurrentMark, getCurrentPlayer, playGame }
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
            let currentPlayer = game.getCurrentPlayer();
           
            if (currentPlayer.name != "Computer") {
                placeMark(tile);                    
                game.playGame(); 
            }
             
                               
        });
    });

    function placeMark(tile) {
        const currentMark = game.getCurrentMark();
        fillBoard(tile.id, currentMark);
        tile.textContent = currentMark;
    }
    
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

    function getEmptyTiles() {
        return emptyTiles = board.reduce(function(arr, curr, idx) {
            if (curr === '')
                arr.push(idx);
            return arr;
        }, []);        
    } 

    function setPcMove() {
        const currentMark = game.getCurrentMark();
        const emptyTiles = getEmptyTiles();
       if (emptyTiles.length >= 1) {
        const randomMove = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        fillBoard(randomMove, currentMark);
        renderBoard();
       }      
    }
  
    return { board, renderBoard, checkWin, boardFull, setPcMove, resetBoard }
})();


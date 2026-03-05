const gameBoard = (function () {
    let _boardSize = 3;
    let board = []
    let lastPlaced;
    let placedCount;
    let nextTurn = "O";

    function setBoardSize(val) {
        _boardSize = val;
    }

    function getNextTurn(){
        return nextTurn;
    }

    function createArray() {
        board = []
        for (let i = 0; i < _boardSize; i++) {
            let row = [];
            for (let j = 0; j < _boardSize; j++) {
                row[j] = null;
            }
            board[i] = row;
        }
        placedCount = 0;
        return board;
        
        
    }
    createArray();

    function getArrayElement(i, j) {
        return this.board[i][j];
    }

    function onClick(index) {
        let row = Math.floor(index / 3);
        let column = index % 3;
        if (nextTurn === "O") {
            addO(row, column);
        } else {
            addX(row, column);
        }
    }

    function addX(i, j) {
        if (board[i][j] == null) {
            board[i][j] = "X";
            displayGame.updateBoard(i, j, "X");
            nextTurn = "O";
            lastPlaced = "X";
            placedCount++;
            checkWin();
        } else {
            console.log("Error! That square has already been filled.");
        }
    }

    function addO(i, j) {
        if (board[i][j] == null) {
            board[i][j] = "O";
            displayGame.updateBoard(i, j, "O");
            nextTurn = "X";
            lastPlaced = "O";
            placedCount++;
            checkWin();
        } else {
            console.log("Error! That square has already been filled.");
        }
    }

    function displayArray() {
        let outputString = "";
        for (let i = 0; i < _boardSize; i++) {
            for (let j = 0; j < _boardSize; j++) {
                outputString += board[i][j];
            }
            outputString += (" \n ");
        }
        return outputString;
    }

    function checkWin() {
        //[(0,0), (0,1), (0,2)], [(1,0), (1,1), (1,2)], [(2,0), (2,1), (2,2)] HORIZONTAL
        //[(0,0), (1,0), (2,0)], [(0,1), (1,1), (2,1)], [(0,2), (1,2), (2,2)] VERTICAL
        //[(0,0), (1,1), (2,2)] , [(0,2), (1,1), (2,0)] DIAGONAL

        //check for draw
        if (lastPlaced != null) {
            //HORIZONTAL
            for (let i = 0; i < _boardSize; i++) {
                for (let j = 0; j < _boardSize; j++) {
                    if (board[i][j] != lastPlaced) {
                        break;
                    } if (j == _boardSize - 1) {
                        if (board[i][j] == lastPlaced) {
                            displayGame.declareWinner(lastPlaced + " wins!");
                            return lastPlaced;
                        }
                    }
                }
            }

            //VERTICAL
            for (let i = 0; i < _boardSize; i++) {
                for (let j = 0; j < _boardSize; j++) {
                    if (board[j][i] != lastPlaced) {
                        break;
                    } if (j == _boardSize - 1) {
                        if (board[j][i] == lastPlaced) {
                            displayGame.declareWinner(lastPlaced + " wins!");
                            return lastPlaced;
                        }
                    }
                }
            }
            //DIAGONALS
            if (board[0][0] == lastPlaced) {
                if (board[1][1] == lastPlaced) {
                    if (board[2][2] == lastPlaced) {
                        displayGame.declareWinner(lastPlaced + " wins!");
                        return lastPlaced;
                    }
                }
            }
            if (board[0][2] == lastPlaced) {
                if (board[1][1] == lastPlaced) {
                    if (board[2][0] == lastPlaced) {
                        displayGame.declareWinner(lastPlaced + " wins!");
                        return lastPlaced;
                    }
                }
            }

        }
        if (placedCount == _boardSize * _boardSize) {
            displayGame.declareWinner("Draw!");
            return;
        }
        return;
    }

    return {
        setBoardSize, createArray, addX, addO, displayArray, checkWin, getArrayElement, onClick, getNextTurn
    };
})();


const displayGame = (function () {
    let container = document.querySelector(".gameContainer");
    const body = document.querySelector("body");
    const board = document.createElement("div");
    board.classList.add("gameBoard");
    const restart = document.querySelector(".restart-btn");

    const resultDiv = document.querySelector(".result-overlay");
    const resultText = document.querySelector(".result");
    const nextTurnDiv = document.querySelector(".next-move");

    function displayFirstTurn(){
        nextTurnDiv.textContent = "Next move: " + gameBoard.getNextTurn();
    }


    function createBoard() {
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div")
            cell.classList.add("gameCell");
            cell.dataset.cellIndex = i;
            cell.addEventListener("click", () => gameBoard.onClick(i));
            board.appendChild(cell);
        }
        container.appendChild(board);
        displayFirstTurn();
    }
    createBoard();

    function updateBoard(i, j, val) {
        let index = (i * 3) + j;
        board.childNodes[index].textContent = val;
        if (val === "O"){
            displayNextTurn("X");
        } else {
            displayNextTurn("O");
        }
    }

    function declareWinner(message) {
        resultDiv.style.display = "flex";
        resultText.textContent = message;
    }

    function restartGame() {
        resultDiv.style.display = "none";
        board.innerHTML = "";
        gameBoard.createArray();
        createBoard();
    }

    function displayNextTurn(next){
        nextTurnDiv.textContent = "Next move: " + next;
    }

    restart.addEventListener("click", restartGame);

    return {
        updateBoard, declareWinner, restartGame, displayNextTurn
    };
})();


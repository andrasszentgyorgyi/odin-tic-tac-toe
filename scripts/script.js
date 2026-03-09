class gameBoard {

    _boardSize = 3;
    board = []
    lastPlaced;
    placedCount;
    _nextTurn = "O";

    constructor() {
        this.createArray();
    }

    createArray() {
        this.board = []
        for (let i = 0; i < this._boardSize; i++) {
            let row = [];
            for (let j = 0; j < this._boardSize; j++) {
                row[j] = null;
            }
            this.board[i] = row;
        }
        this.placedCount = 0;
        return this.board;
    }

    setDisplay(displayInstance) {
        this.display = displayInstance;
    }

    getArrayElement(i, j) {
        return this.board[i][j];
    }

    onClick(index) {
        let row = Math.floor(index / 3);
        let column = index % 3;
        if (this.nextTurn === "O") {
            this.addO(row, column);
        } else {
            this.addX(row, column);
        }
    }

    addX(i, j) {
        if (this.board[i][j] == null) {
            this.board[i][j] = "X";
            this.display.updateBoard(i, j, "X");
            this.nextTurn = "O";
            this.lastPlaced = "X";
            this.placedCount++;
            this.checkWin();
        } else {
            console.log("Error! That square has already been filled.");
        }
    }

    addO(i, j) {
        if (this.board[i][j] == null) {
            this.board[i][j] = "O";
            this.display.updateBoard(i, j, "O");
            this.nextTurn = "X";
            this.lastPlaced = "O";
            this.placedCount++;
            this.checkWin();
        } else {
            console.log("Error! That square has already been filled.");
        }
    }

    displayArray() {
        let outputString = "";
        for (let i = 0; i < _boardSize; i++) {
            for (let j = 0; j < _boardSize; j++) {
                outputString += board[i][j];
            }
            outputString += (" \n ");
        }
        return outputString;
    }

    checkWin() {
        //[(0,0), (0,1), (0,2)], [(1,0), (1,1), (1,2)], [(2,0), (2,1), (2,2)] HORIZONTAL
        //[(0,0), (1,0), (2,0)], [(0,1), (1,1), (2,1)], [(0,2), (1,2), (2,2)] VERTICAL
        //[(0,0), (1,1), (2,2)] , [(0,2), (1,1), (2,0)] DIAGONAL

        //check for draw
        if (this.lastPlaced != null) {
            //HORIZONTAL
            for (let i = 0; i < this._boardSize; i++) {
                for (let j = 0; j < this._boardSize; j++) {
                    if (this.board[i][j] != this.lastPlaced) {
                        break;
                    } if (j == this._boardSize - 1) {
                        if (this.board[i][j] == this.lastPlaced) {
                            this.display.declareWinner(this.lastPlaced + " wins!");
                            return this.lastPlaced;
                        }
                    }
                }
            }

            //VERTICAL
            for (let i = 0; i < this._boardSize; i++) {
                for (let j = 0; j < this._boardSize; j++) {
                    if (this.board[j][i] != this.lastPlaced) {
                        break;
                    } if (j == this._boardSize - 1) {
                        if (this.board[j][i] == this.lastPlaced) {
                            this.display.declareWinner(this.lastPlaced + " wins!");
                            return this.lastPlaced;
                        }
                    }
                }
            }
            //DIAGONALS
            if (this.board[0][0] == this.lastPlaced) {
                if (this.board[1][1] == this.lastPlaced) {
                    if (this.board[2][2] == this.lastPlaced) {
                        this.display.declareWinner(this.lastPlaced + " wins!");
                        return this.lastPlaced;
                    }
                }
            }
            if (this.board[0][2] == this.lastPlaced) {
                if (this.board[1][1] == this.lastPlaced) {
                    if (this.board[2][0] == this.lastPlaced) {
                        this.display.declareWinner(this.lastPlaced + " wins!");
                        return this.lastPlaced;
                    }
                }
            }

        }
        if (this.placedCount == this._boardSize * this._boardSize) {
            this.display.declareWinner("Draw!");
            return;
        }
        return;
    }

    get nextTurn() {
        return this._nextTurn;
    }

    set nextTurn(x){
        this._nextTurn = x;
    }
}



class displayGame {
    container = document.querySelector(".gameContainer");
    body = document.querySelector("body");
    board = document.createElement("div");
    
    restart = document.querySelector(".restart-btn");

    resultDiv = document.querySelector(".result-overlay");
    resultText = document.querySelector(".result");
    nextTurnDiv = document.querySelector(".next-move");
    gameBoardReference;

    constructor(gameBoardReference){
        this.gameBoardReference = gameBoardReference;
        this.board.classList.add("gameBoard");
        this.createBoard();
        this.restart.addEventListener("click", () => this.restartGame());
    }

    displayFirstTurn() {
        this.nextTurnDiv.textContent = "Next move: " + this.gameBoardReference.nextTurn;
    }


    createBoard() {
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div")
            cell.classList.add("gameCell");
            cell.dataset.cellIndex = i;
            cell.addEventListener("click", () => this.gameBoardReference.onClick(i));
            this.board.appendChild(cell);
        }
        this.container.appendChild(this.board);
        this.displayFirstTurn();
    }
    

    updateBoard(i, j, val) {
        let index = (i * 3) + j;
        this.board.childNodes[index].textContent = val;
        if (val === "O") {
            this.displayNextTurn("X");
        } else {
            this.displayNextTurn("O");
        }
    }

    declareWinner(message) {
        this.resultDiv.style.display = "flex";
        this.resultText.textContent = message;
    }

    restartGame() {
        this.resultDiv.style.display = "none";
        this.board.innerHTML = "";
        this.gameBoardReference.createArray();
        this.createBoard();
    }

    displayNextTurn(next) {
        this.nextTurnDiv.textContent = "Next move: " + next;
    }
}

const myGameBoard = new gameBoard();
const myDisplayGame = new displayGame(myGameBoard);
myGameBoard.setDisplay(myDisplayGame);
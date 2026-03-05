const gameBoard = (function () {
    let _boardSize = 3;
    let board = []
    let lastPlaced;
    let placedCount;
    let nextTurn = "O";

    function setBoardSize(val) {
        _boardSize = val;
    }

    function createArray() {
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

    function getArrayElement(i,j){
        return this.board[i][j];
    }

    function onClick(index){
        let row = Math.floor(index/3);
        let column = index % 3;
        if (nextTurn === "O"){
            addO(row,column);
        } else {
            addX(row,column);
        }
    }

    function addX(i, j) {
        if (board[i][j] == null) {
            board[i][j] = "X";
            displayGame.updateBoard(i,j,"X");
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
            displayGame.updateBoard(i,j,"O");
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
        console.log("Placedcount:" + placedCount);
        if(placedCount == _boardSize*_boardSize){
            console.log("Draw!");
            return;
        }
        if (lastPlaced != null) {
            //HORIZONTAL
            for (let i = 0; i < _boardSize; i++) {
                for (let j = 0; j < _boardSize; j++) {
                    if (board[i][j] != lastPlaced) {
                        break;
                    } if (j == _boardSize-1) {
                        if (board[i][j] == lastPlaced) {
                            console.log(lastPlaced + " win! (HORIZONTAL)");
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
                    } if (j == _boardSize-1) {
                        if (board[j][i] == lastPlaced) {
                            console.log(lastPlaced + " win! (VERTICAL)");
                            return lastPlaced;
                        }
                    }
                }
            }
            //DIAGONALS
            if(board[0][0] == lastPlaced){
                if(board[1][1] == lastPlaced){
                    if(board[2][2] == lastPlaced){
                        console.log(lastPlaced+ " win! (DIAGONAL)");
                        return lastPlaced;
                    }
                }
            }
            if(board[0][2] == lastPlaced){
                if(board[1][1] == lastPlaced){
                    if(board[2][0]==lastPlaced){
                        console.log(lastPlaced + " win! (DIAGONAL)");
                        return lastPlaced;
                    }
                }
            }

        }
        console.log("No winner yet");
        return;
    }

    return {
        setBoardSize, createArray, addX, addO, displayArray, checkWin, getArrayElement, onClick
    };
})();


const displayGame = (function (){
    let container = document.querySelector(".gameContainer");
    const body = document.querySelector("body");
    const board = document.createElement("div");
    board.classList.add("gameBoard");


    function createBoard(){
        for(let i = 0; i<9; i++){
            let cell = document.createElement("div")
            cell.classList.add("gameCell");
            cell.dataset.cellIndex = i;
            cell.addEventListener("click", ()=> gameBoard.onClick(i));
            board.appendChild(cell);
        }
        container.appendChild(board);

    }
    createBoard();

    function updateBoard(i,j,val){
        let index = (i * 3) + j;
        board.childNodes[index].textContent = val;
    }

    return {
        updateBoard
    };
})();


const gameBoard = (function () {
    let _boardSize = 3;
    let board = []
    let lastPlaced;

    function setBoardSize(val) {
        _boardSize = val;
    }

    function createBoard() {
        for (let i = 0; i < _boardSize; i++) {
            let row = [];
            for (let j = 0; j < _boardSize; j++) {
                row[j] = null;
            }
            board[i] = row;
        }
        return board;
    }

    function addX(i, j) {
        if (board[i][j] == null) {
            board[i][j] = "X";
            lastPlaced = "X";
            checkWin();
        } else {
            console.log("Error! That square has already been filled.");
        }
    }

    function addO(i, j) {
        if (board[i][j] == null) {
            board[i][j] = "O";
            lastPlaced = "O";
            checkWin();
        } else {
            console.log("Error! That square has already been filled.");
        }
    }

    function displayBoard() {
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
            //DIAGONAL
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
        setBoardSize, createBoard, addX, addO, displayBoard, checkWin
    };
})();


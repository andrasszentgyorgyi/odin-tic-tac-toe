const gameBoard = (function (){
    let _boardSize = 3;
    let board = []

    function setBoardSize(val){
        _boardSize = val;
    }

    function createBoard(){
        for(let i = 0; i<_boardSize; i++){
            let row = [];
            for(let j = 0; j<_boardSize; j++){
                row[j] = null;
            }
            board[i] = row;
        }
        return board;
    }

    function addX(i, j){
        if(board[i][j] == null){
            board[i][j] = "X";
        } else {
            console.log("Error! That square has already been filled.");
        }
    }

    function addO(i, j){
        if(board[i][j] == null){
            board[i][j] = "O";
        } else {
            console.log("Error! That square has already been filled.");
        }
    }

    function displayBoard(){
        let outputString = "";
        for(let i = 0; i<_boardSize; i++){
            for(let j = 0; j<_boardSize; j++){
                outputString += board[i][j];
            }
            outputString += (" \n ");
        }
        return outputString;
    }

    return{
        setBoardSize, createBoard, addX, addO, displayBoard
    };
})();


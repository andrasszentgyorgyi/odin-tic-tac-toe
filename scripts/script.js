
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

    return{
        setBoardSize, createBoard,
    };
})();
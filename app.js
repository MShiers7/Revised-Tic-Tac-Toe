
const gameState = {};
function buildInitialState() {
    gameState.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    gameState.players = 'X';
   
    renderGameBoard();
    document.getElementById('winningText').innerHTML = '';
}


 let player1Name = 'X';
 let player2Name = 'O';



const boardElement = document.querySelector('#gameboard');
const playerTurnElement = document.querySelector('#playerTurn');
const startButton = document.querySelector('.start');
const player1 = document.querySelector('#p1');
const player2 = document.querySelector('#p2');




  const checkWinner = board => {
    const [horizontalWin] = board.filter((row, index) => {
      return row.every((cell, index) => cell && cell === row[0]);
    });
  
    const [verticalWin] = board.reduce((acc, row) => {
      row.forEach((cell, index) =>
        acc[index] ? acc[index].push(cell) : (acc[index] = [cell])
      );
      return acc;
    }, [])

    .filter(row => row.every(cell => cell && cell === row[0]))
  
    const [diagonalWin] = board[0].map((cell, index) => {
      return board.every((row, index) => cell && cell === row[index]);
    });
  
    const [antiDiagonalWin] = board[0].map((cell, index) => {
      return board.every((row, index) => cell && cell === row[row.length - 1 - index])
    });

    const isDraw = board.every(row => row.every(cell => cell));

    const isWinner = !!horizontalWin || !!verticalWin || !!diagonalWin || !!antiDiagonalWin;

    if (isDraw) {
        document.getElementById('winningText').innerHTML = 'Draw!';
    };

    if (isWinner) {
        document.getElementById('winningText').innerHTML = `${gameState.players === "X" ? player1Name : player2Name} Wins!`

        }; 
    
        
  };

  


  
function changeTurns() {
    if (gameState.players === 'X') {
        gameState.players = 'O';
    } else {
        gameState.players = 'X';
    }
        
    
};


function renderGameBoard() {
    boardElement.innerHTML = '';
    for (let yPosition = 0; yPosition < gameState.board.length; yPosition++) {
        const row = gameState.board[yPosition];
        for (let xPosition = 0; xPosition < row.length; xPosition++) {
            const column = row[xPosition];
            const cellElement = document.createElement('div');
            cellElement.classList.add('box');
            cellElement.innerText = gameState.board[yPosition][xPosition];
            cellElement.dataset.positions = `${yPosition}, ${xPosition}`;
            boardElement.appendChild(cellElement);
        }
    } 
   
    
}


function renderPlayer() {
    
    const playerName = gameState.players === "X" ? player1Name : player2Name
    text = `${playerName} 's turn`;
    playerTurnElement.innerText = text;
    }


function render() {
    renderGameBoard();
    renderPlayer();
}

boardElement.addEventListener('click', function (event) {
    if (event.target.className === 'box') {
        let cellElement = event.target;

        
        let [row, column] = cellElement.dataset.positions.split(',');
        const existingValue = gameState.board[Number(row)][Number(column)] 
        if (!!existingValue) return;
       

        

         gameState.board[Number(row)][Number(column)] = gameState.players;
            checkWinner(gameState.board);
            changeTurns();
            renderGameBoard();
            renderPlayer();
            
      
        
        } 
            
        
});





startButton.addEventListener('click', function(event) {
    
    if (event.target.className === 'start')
    buildInitialState();
    renderPlayer();
   
    
});

player1.addEventListener('change', function (event) {
    player1Name = event.target.value; 
    renderPlayer();
    
    
}); 

player2.addEventListener('change', function (event) {
    player2Name = event.target.value;
    renderPlayer();
});
    



buildInitialState();
render();




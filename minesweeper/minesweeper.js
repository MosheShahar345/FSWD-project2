// Minesweeper class
class Minesweeper {
    constructor(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.board = [];
        this.isGameOver = false;
    }

    getCell(row, col) {
        return this.board[row][col];
    }

    // Initialize the board and place mines
    initializeBoard() {
        // Create empty board
        //this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill({ hasMine: false, revealed: false, adjacentMines: 0, flagged: false }));
        this.board = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => ({ hasMine: false, revealed: false, adjacentMines: 0, flagged: false })));


        // Place mines randomly
        let minesPlaced = 0;
        while (minesPlaced < this.mines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            if (!this.board[row][col].hasMine) {
                //this.board[row][col] = { ...this.board[row][col], hasMine: true };
                this.board[row][col].hasMine = true;
                minesPlaced++;
                // Update adjacent cells' mine count
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newRow = row + i;
                        const newCol = col + j;
                        if (
                            newRow >= 0 &&
                            newRow < this.rows &&
                            newCol >= 0 &&
                            newCol < this.cols &&
                            !this.board[newRow][newCol].hasMine
                        ) {
                            const obj = this.board[newRow][newCol];
                            this.board[newRow][newCol].adjacentMines += 1;
                            //this.board[newRow][newCol] = { ...this.board[newRow][newCol], adjacentMines: true };
                        }
                    }
                }
            }
        }
        /* ui
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = '';
        for (let row = 0; row < this.rows; row++) {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            for (let col = 0; col < this.cols; col++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.row = row;
                cellElement.dataset.col = col;
                cellElement.addEventListener('click', () => this.handleCellClick(row, col));
                cellElement.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.toggleFlag(row, col);

                });
                //cellElement.addEventListener('contextmenu', () => this.handleCellFlagged(row, col));

                rowElement.appendChild(cellElement);
            }
            gameContainer.appendChild(rowElement);
        }
            */

    }

    /* ui
    // Render the board in HTML
    renderBoard() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.renderCell(row, col);
            }
        }
    }

     renderCell(row, col) {
        //console.log(`renderCell row: ${row}, col: ${col}`)
        const cell = this.board[row][col];
        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

        // Add visual state based on cell properties
        if (cell.revealed) {
            cellElement.classList.add('revealed');
            if (cell.hasMine) {
                cellElement.textContent = '💣';
            } else if (cell.adjacentMines > 0) {
                cellElement.textContent = cell.adjacentMines;
            }
        } else if (cell.flagged) {
            cellElement.textContent = '🚩';
            console.log(cellElement);
        } else {
            cellElement.textContent = '';
        }

        return cellElement;
    }

    // Function blueprint: Handle cell clicks
    handleCellClick(row, col) {
        console.log(`handleCellClick row: ${row}, col: ${col}`)
        // Logic to reveal a cell and check win/lose conditions
        if(this.board[row][col].flagged) return;
        if(this.board[row][col].hasMine) {
            this.revealAllCells();
        } else {
            this.revealAdjacentCells(row, col);
            this.checkWin();
            this.renderBoard();
        }
    }

    // Toggle flag on a cell
    toggleFlag(row, col) {
        const cell = this.board[row][col];
        if (!cell.revealed) {
            //const flag = this.board[row][col].flagged ? false : true;
            //this.board[row][col] = { ...this.board[row][col], flagged: flag };
            cell.flagged = !cell.flagged;
            this.renderBoard();
        }
    }
    */

    handleCellClick(row, col) {
        console.log(`handleCellClick row: ${row}, col: ${col}`)
        // Logic to reveal a cell and check win/lose conditions
        if(this.board[row][col].flagged) return;
        if(this.board[row][col].hasMine) {
            this.revealAllCells();
        } else {
            this.revealAdjacentCells(row, col);
            this.checkWin();
        }
    }

    // Toggle flag on a cell
    toggleFlag(row, col) {
        const cell = this.board[row][col];
        if (!cell.revealed) {
            //const flag = this.board[row][col].flagged ? false : true;
            //this.board[row][col] = { ...this.board[row][col], flagged: flag };
            cell.flagged = !cell.flagged;
        }
    }

    // Function blueprint: Reveal all cells
    revealAllCells() {
        // Logic to reveal all cells when the game ends
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
            this.board[row][col] = { ...this.board[row][col], revealed: true };
            }
        }
    }

     // Reveal adjacent cells using BFS
    revealAdjacentCells(row, col) {
        const queue = [];
        queue.push({ row, col });

        while (queue.length > 0) {
            const { row: currentRow, col: currentCol } = queue.shift();

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = currentRow + i;
                    const newCol = currentCol + j;

                    if (
                        newRow >= 0 &&
                        newRow < this.rows &&
                        newCol >= 0 &&
                        newCol < this.cols &&
                        !this.board[newRow][newCol].revealed &&
                        !this.board[newRow][newCol].hasMine
                    ) {
                        this.board[newRow][newCol].revealed = true;

                        if (this.board[newRow][newCol].adjacentMines === 0) {
                            queue.push({ row: newRow, col: newCol });
                        }
                    }
                }
            }
        }
    }

    // Function blueprint: Count adjacent mines
    countAdjacentMines(row, col) {
        // Logic to count mines around a given cell
    }

    // Function blueprint: Check win condition
    checkWin() {
        // Logic to determine if the player has won
    }

    // Function blueprint: Reset the game
    resetGame() {
        // Logic to reset the board and state
    }
}

// Example usage:
const game = new Minesweeper(10, 10, 10);
game.initializeBoard();
//game.renderBoard();

// Event listeners would handle user interaction with the rendered board.


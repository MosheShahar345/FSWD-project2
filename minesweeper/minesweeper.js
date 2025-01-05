// Minesweeper class
const GameState = Object.freeze({
            DEFAULT: Symbol("default"),
            LOST: Symbol("lost"),
            WON: Symbol("won")
});

class Minesweeper {
    constructor(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.board = [];
        this.isGameOver = false;
        this.cellsFlagged = 0;
        this.GameState = GameState.DEFAULT;
    }

    getCell(row, col) {
        return this.board[row][col];
    }

    getRemainingMines() {
        return this.mines - this.cellsFlagged;
    }

    get getGameState() {
        return this.gameState;
    }

    // Initialize the board and place mines
    initializeBoard() {
        //this.isGameOver = false;
        this.gameState = GameState.DEFAULT;
        this.cellsFlagged = 0;
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
    }

    toggleFlag(row, col) {
        const cell = this.board[row][col];
        if (!cell.revealed) {
            //const flag = this.board[row][col].flagged ? false : true;
            //this.board[row][col] = { ...this.board[row][col], flagged: flag };
            cell.flagged = !cell.flagged;
            this.cellsFlagged = cell.flagged ? this.cellsFlagged + 1 : this.cellsFlagged - 1;
        }
    }

    handleCellClick(row, col) {
        if (this.board[row][col].flagged) { //if the cell was flagged
            return; 
        }
        else if (this.board[row][col].hasMine) { //if the cell was a mine
            this.GameLost();
            return;
        } else if (this.board[row][col].adjacentMines == 0) { //if the cell has no adjacent mines
            this.revealAdjacentCells(row, col);
        } else { //if the cell has adjacent mines
            this.board[row][col].revealed = true;
        }
        this.checkGameState();
    }

    checkGameState() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (!this.board[row][col].hasMine && !this.board[row][col].revealed) return;
            }
        }
        this.gameState = GameState.WON;
    }

    GameLost() {
        this.gameState = GameState.LOST;

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

    resetGame() {
        this.initializeBoard();
    }
}

class MinesweeperUI {
    constructor(game, containerId) {
        this.game = game; // Instance of the Minesweeper class
        this.gameContainer = document.getElementById(containerId);
        this.rows = this.game.rows;
        this.cols = this.game.cols;
    }

    initializeUI() {
        this.gameContainer.innerHTML = '';
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
            this.gameContainer.appendChild(rowElement);
        }
        console.log(this.gameContainer);
    }

    renderBoard() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.renderCell(row, col);
            }
        }
    }

     renderCell(row, col) {
        //console.log(`renderCell row: ${row}, col: ${col}`)
        //const cell = this.game.board[row][col];
        const cell = this.game.getCell(row, col);
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
            cellElement.classList.add('flagged');
            console.log(cellElement);
        } else {
            cellElement.classList.remove('flagged');
            cellElement.classList.remove('revealed');
            cellElement.textContent = '';
        }

        return cellElement;
    }

    // Function blueprint: Handle cell clicks
    handleCellClick(row, col) {
        this.game.handleCellClick(row,col);
        this.renderBoard();
    }

    // Toggle flag on a cell
    toggleFlag(row, col) {
        this.game.toggleFlag(row,col);
        this.renderBoard();
    }

}
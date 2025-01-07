class MinesweeperUI {
    constructor(gameContainerId, gameStatusId, rows = 10, cols = 10, mines = 20) {
        this.seconds = 0;
        this.timerInterval;
        //this.game = game; // Instance of the Minesweeper class
        this.gameContainer = document.getElementById(gameContainerId);
        this.gameStatus = document.getElementById(gameStatusId);
        this.flaggedCountElement = document.getElementById('flagged-count');
        this.StateElement = document.getElementById('state');
        this.TimerElement = document.getElementById("timer");

        this.game = new Minesweeper(rows, cols, mines);
        this.game.initializeBoard();

        this.rows = rows;
        this.cols = cols;
    }

    // Function to update the timer
    updateTimer() {
        this.seconds += 1;
        this.TimerElement.textContent = this.seconds.toString().padStart(3, '0');
    }

    initializeUI() {
        //initialize games status
        this.flaggedCountElement.textContent = this.game.getRemainingMines();
        this.StateElement.addEventListener('click', () => this.handleReset());
        this.StateElement.textContent = "😀";

        //initialize board
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
        if(this.game.getRemainingMines)
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.renderCell(row, col);
            }
        }
    }

    renderWrongCell(row, col) {
    }

    renderCell(row, col) {
        //console.log(`renderCell row: ${row}, col: ${col}`)
        //const cell = this.game.board[row][col];
        const cell = this.game.getCell(row, col);
        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

        // Add visual state based on cell properties
        if (cell.revealed && cell.hasMine) {
            this.renderCellElement(row, col, '💣', 'mine');
        } else if(cell.revealed && cell.adjacentMines > 0) {
            this.renderCellElement(row, col, cell.adjacentMines, 'revealed');
        }  else if(cell.revealed) {
            this.renderCellElement(row, col, '', 'revealed');
        } else if(cell.flagged) {
            this.renderCellElement(row, col, '🚩', 'flagged');
        } else {
            this.renderCellElement(row, col, '');

        }
        /*
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
        */
    }

    renderCellElement(row, col, textContent, elementClass = NaN) {
        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if(cellElement.classList.length > 0) cellElement.classList.remove(...cellElement.classList);//remove all element classes
        cellElement.classList.add('cell');
        if (elementClass) cellElement.classList.add(elementClass);
        cellElement.textContent = textContent;
    }

    handleCellClick(row, col) {
        if(this.game.getGameState !== GameState.DEFAULT) return;
        if (this.seconds === 0) {
            this.timerInterval = setInterval(() => { this.updateTimer(); }, 1000);//start timer
            console.log(this.timerInterval);
        }

        this.game.handleCellClick(row, col);
        this.renderBoard();

        switch (this.game.getGameState) {
            case GameState.WON:
                this.StateElement.textContent = "😄";
                console.log(this.timerInterval);
                clearInterval(this.timerInterval); // Stop the timer
                break;
            case GameState.LOST:
                this.StateElement.textContent = "😫";
                this.renderCellElement(row, col,'💣','exploded');
                console.log(this.timerInterval);
                clearInterval(this.timerInterval); // Stop the timer
                break;
        }
    }

    // Toggle flag on a cell
    toggleFlag(row, col) {
        this.game.toggleFlag(row, col);
        this.flaggedCountElement.textContent = this.game.getRemainingMines();
        this.renderBoard();
    }

    handleReset() {
        this.game.resetGame();
        this.StateElement.textContent = "😀";
        clearInterval(this.timerInterval); // Stop the timer
        this.seconds = 0; // Reset seconds to 0
        this.TimerElement.textContent = '000';
        this.flaggedCountElement.textContent = this.game.getRemainingMines();
        this.renderBoard();
    }

}

const minesweeper = new MinesweeperUI('game-container', 'game-status');
minesweeper.initializeUI();
console.log("asdf");
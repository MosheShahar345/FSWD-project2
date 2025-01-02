function createMinesweeper(containerId, rows = 10, cols = 10, mines = 20) {
    const game = new Minesweeper(rows, cols, mines);
    const ui = new MinesweeperUI(game, containerId);

    game.initializeBoard();
    ui.initializeUI();
    //ui.renderBoard();

    return { game, ui };
}

const asdf = createMinesweeper('game-container');
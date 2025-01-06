function createMinesweeper(containerId,gameStatusId, rows = 10, cols = 10, mines = 20) {
    const game = new Minesweeper(rows, cols, mines);
    const ui = new MinesweeperUI(game, containerId, gameStatusId);

    game.initializeBoard();
    ui.initializeUI();
    //ui.renderBoard();

    return { game, ui };
}

//const asdf = createMinesweeper('game-container', 'game-status');
console.log("main.js is loaded");
//headerUi = createHeader();
footerUi = createFooter();

const header = new Header();
header.createHeader();

let user = {info: null};

login = new Login(user,() => header.LoggedInUI());

// Create a new instance of the Minesweeper game
const minesweeper = new MinesweeperUI('game-container', 'game-status', user);
minesweeper.initializeUI();

// Create a new instance of the Snake game
// const snake = new SnakeGame({
//     board: 'game-board',
//     instructionText: 'instruction-text',
//     logo: 'logo',
//     score: 'score',
//     highScoreText: 'high-score',
//     modeSelection: 'mode-selection',
//     pauseButton: 'pause-button',
//     stopButton: 'stop-button',
//     gameControls: 'game-controls',
//     icon: 'i'
// });

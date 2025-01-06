
//headerUi =  createHeader();
footerUi =  createFooter();

const header = new Header();
header.createHeader();

let user = {info: null};

login = new Login(user,() => header.LoggedInUI());


//const minesweeper = createMinesweeper('game-container', 'game-status', user);

const ui = new MinesweeperUI('game-container', 'game-status', user);
ui.initializeUI();
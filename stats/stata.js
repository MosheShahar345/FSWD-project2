import { updateLeaderboardSnake, updateLeaderboardMinesweeoer} from '../js/utils.js';

let leaderboardSnake = JSON.parse(localStorage.getItem('leaderboardSnake')) || [];
updateLeaderboardSnake(leaderboardSnake);

let leaderboardMinesweeoer = JSON.parse(localStorage.getItem('leaderboardMinesweeoer')) || [];
updateLeaderboardMinesweeoer(leaderboardMinesweeoer);
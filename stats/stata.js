import { updateLeaderboard } from '../js/utils.js';

let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
updateLeaderboard(leaderboard);
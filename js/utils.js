export function updateLeaderboardSnake(leaderboard) {
    const statsTable = document.getElementById('snake-user-stats-data');

    // Clear the table body
    statsTable.innerHTML = '';

    // Sort leaderboard by score in descending order and take the top 10
    const top10 = leaderboard.slice(0, 10);

    // Populate the table with the updated leaderboard
    top10.forEach((entry) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.username}</td>
            <td>${entry.snakeHighScore ?? '---'}</td>
            <td>${new Date(entry.Date).toLocaleString()}</td>
        `;
        statsTable.appendChild(row);
    });
}

export function updateLeaderboardMinesweeoer(leaderboard) {
    const statsTable = document.getElementById('minesweeper-user-stats-data');

    // Clear the table body
    statsTable.innerHTML = '';

    // Sort leaderboard by score in descending order and take the top 10
    const top10 = leaderboard.slice(0, 10);

    // Populate the table with the updated leaderboard
    top10.forEach((entry) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.username}</td>
            <td>${entry.minesweeperScore ?? '---'}</td>
            <td>${new Date(entry.Date).toLocaleString()}</td>
        `;
        statsTable.appendChild(row);
    });
}
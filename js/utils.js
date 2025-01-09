export function updateLeaderboard(leaderboard) {
    const statsTable = document.getElementById('user-stats-data');

    // Clear the table body
    statsTable.innerHTML = '';

    // Sort leaderboard by score in descending order and take the top 10
    const top10 = leaderboard
        .sort((a, b) => b.snakeHighScore - a.snakeHighScore)
        .slice(0, 10);

    // Populate the table with the updated leaderboard
    top10.forEach((entry) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.username}</td>
            <td>${entry.snakeHighScore ?? '---'}</td>
            <td>${entry.mainesweeperHighScore ?? '---'}</td>
            <td>${new Date(entry.Date).toLocaleString()}</td>
        `;
        statsTable.appendChild(row);
    });
}
export function updateLeaderboard(leaderboard, statsTable) {
    const statsTable = document.getElementById(statsTable);

    // Clear the table body
    statsTable.innerHTML = ' ';

    // Populate the table with the updated leaderboard
    leaderboard.forEach((entry, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
            <td>${new Date(entry.date).toLocaleString()}</td>
        `;
        statsTable.appendChild(row);
    });
}
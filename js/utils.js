export function updateLeaderboard(leaderboard) {
    const statsTable = document.querySelector("#user-stats tbody");

    // Clear the table body
    statsTable.innerHTML = "";

    // Populate the table with the updated leaderboard
    leaderboard.forEach((entry, index) => {
        let row = statsTable.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
            <td>${new Date(entry.date).toLocaleString()}</td>
        `;
    });
}
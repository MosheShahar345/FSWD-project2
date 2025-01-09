localStorage.setItem('currentUser', JSON.stringify({
    'userName': 'mosheS',
    'password': '12345',
    'highScore': 2
}));

import { updateLeaderboard } from '../js/utils.js';

/**
 * Class representing the Snake Game.
 * The game includes the ability to start, pause, resume, and reset, 
 * with options for different game modes and score tracking.
 */
class SnakeGame {
    /**
     * Creates an instance of the SnakeGame.
     * @param {Object} options - Configuration for HTML elements and game controls.
     * @param {string} options.board - The ID of the game board element.
     * @param {string} options.instructionText - The ID of the instruction text element.
     * @param {string} options.logo - The ID of the logo element.
     * @param {string} options.score - The ID of the score display element.
     * @param {string} options.highScoreText - The ID of the high score display element.
     * @param {string} options.modeSelection - The ID of the mode selection element.
     * @param {string} options.pauseButton - The ID of the pause button element.
     * @param {string} options.stopButton - The ID of the stop button element.
     * @param {string} options.gameControls - The ID of the game controls container element.
     * @param {string} options.icon - The class name of the icon inside the pause button.
     */
    constructor({ board, instructionText, logo, score, highScoreText, modeSelection, pauseButton, stopButton, gameControls, icon }) {
        // HTML elements
        this.board = document.getElementById(board);
        this.instructionText = document.getElementById(instructionText);
        this.logo = document.getElementById(logo);
        this.score = document.getElementById(score);
        this.highScoreText = document.getElementById(highScoreText);
        this.modeSelection = document.getElementById(modeSelection);
        this.pauseButton = document.getElementById(pauseButton);
        this.stopButton = document.getElementById(stopButton);
        this.gameControls = document.getElementById(gameControls);
        this.pauseIcon = this.pauseButton.querySelector(icon);
        this.stopIcon = this.pauseIcon.querySelector(icon);

        // Game variables
        this.gridSize = 25; // Grid size of the game board
        this.snakeCoor = Math.floor(this.gridSize / 2); // Initial snake coordinates
        this.snake = [{x: this.snakeCoor, y: this.snakeCoor}, {x: this.snakeCoor + 1, y: this.snakeCoor}]; // Initial snake positions
        this.food = this.generateFood(); // Food position
        this.direction = 'right'; // Initial snake movement direction
        this.nextDirection = 'right'; // Next direction the snake will move in
        this.gameInterval = null; // Interval for the game loop
        this.gameSpeedDelay = 200; // Speed of the game, lower values are faster
        this.isGameStarted = false; // Indicates if the game has started
        this.eatSound = new Audio('./audio/food.mp3'); // Sound played when snake eats food
        this.collisionSound = new Audio('./audio/gameover.mp3'); // Sound played when snake collides
        this.currentMode = 'hard'; // Current game mode
        this.isWallPassable = false; // Indicates if walls are passable (easy mode)
        this.isGamePaused = false; // Indicates if the game is paused
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.highScore = this.user ? this.user.highScore : 0; // Track the highest score

        this.updateHighScore();

        // Event listeners
        document.addEventListener('keydown', this.handleKeyPress.bind(this));

        document.getElementById('easy-mode').addEventListener('change', () => {
            if (document.getElementById('easy-mode').checked) {
                this.currentMode = 'easy';
                this.isWallPassable = true;
                this.startGame();
            }
        });

        document.getElementById('hard-mode').addEventListener('change', () => {
            if (document.getElementById('hard-mode').checked) {
                this.currentMode = 'hard';
                this.isWallPassable = false;
                this.startGame();
            }
        });

        this.pauseButton.addEventListener('click', this.pauseUnpause.bind(this));
        this.stopButton.addEventListener('click', this.resetGame.bind(this));
    }

    /**
     * Draws the game elements (snake, food, score).
     */
    drawGame() {
        this.board.innerHTML = '';
        this.drawSnake();
        this.drawFood();
        this.updateScore();
    }

    /**
     * Draws the snake on the board.
     */
    drawSnake() {
        this.snake.forEach((obj) => {
            const snakeElement = this.createGameElement('div', 'snake');
            this.setPos(snakeElement, obj);
            this.board.appendChild(snakeElement);
        });
    }

    /**
     * Creates a game element (either snake or food) in the DOM.
     * @param {string} tag - The type of the HTML element ('div').
     * @param {String} className - The class name for the element ('snake' or 'food').
     * @returns {HTMLElement} The created HTML element.
     */
    createGameElement(tag, className) {
        const element = document.createElement(tag);
        element.className = className;
        return element;
    }

    /**
     * Sets the position of a game element on the board using CSS Grid.
     * @param {HTMLElement} element - The element to position.
     * @param {Object} pos - The position {x, y}.
     */
    setPos(element, pos) {
        element.style.gridColumn = pos.x;
        element.style.gridRow = pos.y;
    }

    /**
     * Generates a random valid position for the food on the grid, ensuring it does not overlap with the snake.
     * @returns {Object} The food position {x, y}.
     */
    generateFood() {
        let foodPosition;
        let isPositionValid = false;

        while (!isPositionValid) {
            const x = Math.floor(Math.random() * this.gridSize) + 1;
            const y = Math.floor(Math.random() * this.gridSize) + 1;

            foodPosition = { x, y };

            isPositionValid = !this.snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y);
        }

        return foodPosition;
    }

    /**
     * Draws the food element on the board.
     */
    drawFood() {
        if (this.isGameStarted) {
            const foodElement = this.createGameElement('div', 'food');
            this.setPos(foodElement, this.food);
            this.board.appendChild(foodElement);
        }
    }

    /**
     * Moves the snake based on the current direction and checks for food collision or wall collision.
     */
    move() {
        this.direction = this.nextDirection;

        const head = {...this.snake[0]}; // Copy the head of the snake to move
        switch (this.direction) {
            case 'right':
                head.x++;
                break;
            case 'left':
                head.x--;
                break;
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
        }

        this.snake.unshift(head); // Add new head to the front of the snake

        if (head.x === this.food.x && head.y === this.food.y) {
            this.food = this.generateFood();
            this.increaseSpeed();
            this.playEatSound();
            clearInterval(this.gameInterval);
            this.gameInterval = setInterval(() => {
                this.move();
                this.checkCollision();
                this.drawGame();
            }, this.gameSpeedDelay);
        } else {
            this.snake.pop();  // Remove the last segment of the snake
        }
    }

    /**
     *  Starts the game by initializing game variables and starting the game loop.
     */
    start() {
        console.log('Starting the game...');
        this.isGameStarted = true;
        this.modeSelection.style.display = 'none';
        this.instructionText.style.display = 'none';
        this.logo.style.display = 'none'; 
        this.pauseButton.style.display = 'block';
        this.stopButton.style.display = 'block';
        this.gameControls.style.display = 'flex';
        this.gameInterval = setInterval(() => {
            this.move();
            this.checkCollision();
            this.drawGame();
        }, this.gameSpeedDelay);
    }

    /**
     * Checks if the snake collides with itself or the wall. Ends the game if a collision occurs.
     */
    checkCollision() {
        const head = this.snake[0];

        // Handle wall collision depending on the game mode (easy or hard)
        if (this.isWallPassable) {
            if (head.x < 1) head.x = this.gridSize;
            if (head.x > this.gridSize) head.x = 1;
            if (head.y < 1) head.y = this.gridSize;
            if (head.y > this.gridSize) head.y = 1;
        } else {
            // If wall is not passable (hard mode), game ends on collision
            if (head.x < 1 || head.x > this.gridSize || head.y < 1 || head.y > this.gridSize) {
                this.playCollisionSound();
                this.resetGame();
            }
        }

        // Check if the snake collides with itself
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.playCollisionSound();
                this.resetGame();
            }
        }
    }

    /**
     * Stops the game and resets the UI to the initial state.
     */
    stop() {
        clearInterval(this.gameInterval);
        this.isGameStarted = false;
        this.isGamePaused = false;
        this.instructionText.style.display = 'block';
        this.logo.style.display = 'block';
        this.modeSelection.style.display = 'block';
        this.pauseButton.style.display = 'none';
        this.stopButton.style.display = 'none';
        this.gameControls.style.display = 'none';
    }

    /**
     * Resets the game to its initial state after a collision or when the player decides to stop.
     */
    resetGame() {
        this.updateHighScore();
        this.stop();
        this.snake = [{x: this.snakeCoor, y: this.snakeCoor}, {x: this.snakeCoor + 1, y: this.snakeCoor}];
        this.food = this.generateFood();
        this.direction = 'right';
        this.nextDirection = 'right';
        this.gameSpeedDelay = 200;
        this.updateScore();
        this.drawGame();
        this.user && localStorage.setItem('currentUser', JSON.stringify({ 
            ...this.user,
            'highScore': this.highScore
        }));
        saveScoreToLeaderBoard(this.highScore);
    }

    /**
     * Updates the score displayed on the screen based on the current length of the snake.
     */
    updateScore() {
        const currentScore = this.snake.length - 2;
        this.score.textContent = currentScore.toString().padStart(3, '0');
    }

    /**
     * Updates the high score displayed on the screen if the current score is higher.
     */
    updateHighScore() {
        const currentScore = this.snake.length - 2;
        if (currentScore > this.highScore) {
            this.highScore = currentScore;
        }

        this.highScoreText.textContent = this.highScore.toString().padStart(3, '0');

        if (this.isGameStarted || this.user) {
            this.highScoreText.style.display = 'block';
        }
    }

    /**
     * Increases the speed of the game as the snake eats more food.
     */
    increaseSpeed() {
        if (this.gameSpeedDelay > 150) {
            this.gameSpeedDelay -= 10;
        } else if (this.gameSpeedDelay > 100) {
            this.gameSpeedDelay -= 5;
        } else if (this.gameSpeedDelay > 50) {
            this.gameSpeedDelay -= 2;
        } else if (this.gameSpeedDelay > 25) {
            this.gameSpeedDelay -= 1;
        }
    }

    playEatSound() {
        this.eatSound.play();
    }

    playCollisionSound() {
        this.collisionSound.play();
    }

    /**
     * Handles key press events to control the snake's movement and game states.
     * Allows the user to start, pause, or resume the game, as well as change the snake's direction.
     * 
     * @param {KeyboardEvent} event - The key press event.
     */
    handleKeyPress(event) {

        // Prevent default actions for arrow keys and spacebar to avoid scrolling and other behaviors
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', ' '].includes(event.key)) {
            event.preventDefault();
        }

        // Handle spacebar for starting or pausing the game
        if (event.code === 'Space' || event.key === ' ') {

            if (!this.isGameStarted) {
                this.start(); // Start the game if it hasn't started
            } else {
                this.pauseUnpause(); // Pause or unpause the game if it's already running
            }
        } else {
             // Change the direction of the snake based on arrow key presses, ensuring the snake doesn't go in the opposite direction
            switch (event.key) {
                case 'ArrowUp':
                    if (this.direction !== 'down') this.nextDirection = 'up';
                    break;
                case 'ArrowDown':
                    if (this.direction !== 'up') this.nextDirection = 'down';
                    break;
                case 'ArrowRight':
                    if (this.direction !== 'left') this.nextDirection = 'right';
                    break;
                case 'ArrowLeft':
                    if (this.direction !== 'right') this.nextDirection = 'left';
                    break;
            }
        }
    }

    /**
     * Pauses or unpauses the game based on the current state.
     */
    pauseUnpause() {
        if (!this.isGameStarted) return;
        if (this.isGamePaused) {
            this.resumeGame();
        } else {
            this.pauseGame();
        }
    }

    /**
     * Pauses the game and stops the game loop.
     */
    pauseGame() {
        clearInterval(this.gameInterval);
        this.pauseIcon.classList.replace('fa-pause', 'fa-play');
        this.isGamePaused = true;
    }

    /**
     * Resumes the game and starts the game loop.
     */
    resumeGame() {
        this.gameInterval = setInterval(() => {
            this.move();
            this.checkCollision();
            this.drawGame();
        }, this.gameSpeedDelay);
        this.pauseIcon.classList.replace('fa-play', 'fa-pause');
        this.isGamePaused = false;
    }

    /**
     * 
     * @param {Number} score 
     */
    saveScoreToLeaderBoard(score) {
        const currentUser = this.user ? this.user.userName : null;

        if (!currentUser) return;
     
        const currentDate = new Date().toISOString();
    
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    
        // Find the existing entry for the current user
        const existingEntry = leaderboard.find((entry) => entry.name === currentUser);
    
        if (existingEntry) {
            // Update the score if the new score is higher
            if (score > existingEntry.score) {
                existingEntry.score = score;
                existingEntry.date = currentDate;
            }
        } else {
            // Add a new entry for the current user
            leaderboard.push({ name: currentUser, score, date: currentDate });
        }
    
        leaderboard.sort((a, b) => b.score - a.score);
    
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    
        updateLeaderboard(leaderboard);
    }
}

// Create a new instance of the Snake game
const snake = new SnakeGame({
    board: 'game-board',
    instructionText: 'instruction-text',
    logo: 'logo',
    score: 'score',
    highScoreText: 'high-score',
    modeSelection: 'mode-selection',
    pauseButton: 'pause-button',
    stopButton: 'stop-button',
    gameControls: 'game-controls',
    icon: 'i'
});
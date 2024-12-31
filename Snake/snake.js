// HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('high-score');
const modeSelection = document.getElementById('mode-selection');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const puaseIcon = pauseButton.querySelector('i');
const stopIcon = puaseIcon.querySelector('i');

// Game variables
const gridSize = 30;
let snake = [{x: 15, y: 15}, {x: 16, y: 15}];
let food = generateFood();
let direction = 'right';
let nextDirection = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let isGameStarted = false;
let highScore = 0;
const eatSound = new Audio('./audio/food.mp3');
const collisionSound = new Audio('./audio/gameover.mp3');
let currentMode = 'hard';
let isWallPassable = false;
let isGamePaused = false;

// Draw the game's elements
function drawGame() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

// Draw the snake element
function drawSnake() {
    snake.forEach((obj) => {
        const snakeElement = createGameElement('div', 'snake');
        setPos(snakeElement, obj);
        board.appendChild(snakeElement);
    });
}

// Creates a snake/food html element 
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set the position of the snake/food
function setPos(element, pos) {
    element.style.gridColumn = pos.x;
    element.style.gridRow = pos.y;
}

// Generates a random coordinate in x and y position between 1 and gridSize for food
function generateFood() {
    let foodPosition;
    let isPositionValid = false;

    while (!isPositionValid) {
        const x = Math.floor(Math.random() * gridSize) + 1; // random 1-gridSize
        const y = Math.floor(Math.random() * gridSize) + 1;

        foodPosition = { x, y };

        // Check if foodPosition overlaps with any segment of the snake
        isPositionValid = !snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y);
    }

    return foodPosition;
}

// Draw the food element
function drawFood() {
    if (isGameStarted) {
        const foodElement = createGameElement('div', 'food');
        setPos(foodElement, food);
        board.appendChild(foodElement);
    }
}

// Snake moovments 
function move() {
    direction = nextDirection;

    const head = {...snake[0]};
    switch (direction) {
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

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed();
        playEatSound();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            drawGame();
        }, gameSpeedDelay)
    } else {
        snake.pop();
    }
}

// Starts the game
function start() {
    isGameStarted = true;
    modeSelection.style.display = 'none';
    instructionText.style.display = 'none';
    logo.style.display = 'none'; 
    pauseButton.style.display = 'block';
    stopButton.style.display = 'block';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        drawGame();
    }, gameSpeedDelay) 
}

function checkCollision() {
    const head = snake[0];

    // Wall collision logic for easy mode
    if (isWallPassable) {
        if (head.x < 1) head.x = gridSize;  // Snake passes through left wall
        if (head.x > gridSize) head.x = 1;  // Snake passes through right wall
        if (head.y < 1) head.y = gridSize;  // Snake passes through top wall
        if (head.y > gridSize) head.y = 1;  // Snake passes through bottom wall
    } else {
        // Wall collision logic for hard mode
        if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
            playCollisionSound();
            resetGame();
        }
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            playCollisionSound();
            resetGame();
        }
    }
}

function stop() {
    clearInterval(gameInterval);
    isGameStarted = false;
    isGamePaused = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
    modeSelection.style.display = 'block';
    pauseButton.style.display = 'none';
    stopButton.style.display = 'none';
}

function resetGame() {
    updateHighScore();
    stop();
    snake = [{x: 15, y: 15}, {x: 16, y: 15}]; 
    food = generateFood();
    direction = 'right';
    nextDirection = 'right';
    gameSpeedDelay = 200;
    updateScore();
    drawGame();
}

function updateScore() {
    const currentScore = snake.length - 2;
    score.textContent = currentScore.toString().padStart(3, '0');
}

function updateHighScore() {
    const currentScore = snake.length - 2;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
    highScoreText.style.display = 'block';
}

function increaseSpeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 10;
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
}

function playEatSound() {
    eatSound.play();
}

function playCollisionSound() {
    collisionSound.play();
}

// Add event listener 
function handleKeyPress(event) {
    if (event.code === 'Space' || event.key === ' ') {
        event.preventDefault();

        if (!isGameStarted) {
            start();
        } else {
            pauseUnpause();
        }
    } else {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') nextDirection = 'down';
                break;
            case 'ArrowRight':
                if (direction !== 'left') nextDirection = 'right';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') nextDirection = 'left';
                break;
        }
    }
}

// Function to pause the game
function pauseGame() {
    clearInterval(gameInterval);
    isGamePaused = true;
    puaseIcon.classList.remove('fa-pause');
    puaseIcon.classList.add('fa-play');
    pauseButton.title = 'Resume';
}

// Function to resume the game
function resumeGame() {
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        drawGame();
    }, gameSpeedDelay);
    isGamePaused = false; 
    puaseIcon.classList.remove('fa-play');
    puaseIcon.classList.add('fa-pause');
    pauseButton.title = 'Pause';
}

document.addEventListener('keydown', handleKeyPress);

document.getElementById('easy-mode').addEventListener('change', () => {
    if (document.getElementById('easy-mode').checked) {
        currentMode = 'easy';
        isWallPassable = true;
        startGame();
    }
});

document.getElementById('hard-mode').addEventListener('change', () => {
    if (document.getElementById('hard-mode').checked) {
        currentMode = 'hard';
        isWallPassable = false;
        startGame();
    }
});

document.getElementById('pause-button').addEventListener('click', pauseUnpause);

document.getElementById('stop-button').addEventListener('click', resetGame);

function pauseUnpause() {
    if (!isGameStarted) return;
    if (isGamePaused) {
        resumeGame();
    } else {
        pauseGame();
    }
}
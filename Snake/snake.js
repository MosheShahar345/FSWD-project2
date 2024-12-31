// HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('high-score');

// Game variables
const gridSize = 20;
let snake = [{x: 10, y: 10}, {x: 11, y: 10}];
let food = generateFood();
let direction = 'right';
let nextDirection = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let isGameStarted = false;
let highScore = 0;

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

// Generates a random coordinate in x and y position between 1 and 20 for food
function generateFood() {
    let foodPosition;
    let isPositionValid = false;

    while (!isPositionValid) {
        const x = Math.floor(Math.random() * gridSize) + 1; // random 1-20
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
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        drawGame();
    }, gameSpeedDelay) 
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function stop() {
    clearInterval(gameInterval);
    isGameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
}

function resetGame() {
    updateHighScore();
    stop();
    snake = [{x: 10, y: 10}, {x: 11, y: 10}];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
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

// Add event listener 
function handleKeyPress(event) {
    if ((!isGameStarted && event.code === 'Space') || (!isGameStarted && event.key === ' ')) {
        start();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') nextDirection  = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') nextDirection  = 'down';
                break;
            case 'ArrowRight':
                if (direction !== 'left') nextDirection  = 'right';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') nextDirection  = 'left';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

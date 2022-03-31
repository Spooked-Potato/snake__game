const gridSizeInput = document.getElementById("grid__size");
const btn_on = document.querySelector(".button_top");

btn_on.addEventListener("click", function () {
    document.getElementById("overlay").style.display = "block";

})

let gameOver = false;
let lastRenderTime = 0;
let SNAKE_SPEED = 5;
const EXPANSION_RATE = 1;
let GRID_SIZE = gridSizeInput.value;
const snakeBody = [
    { x: 10, y: 11 }

];
let food = getRandomFoodPosition();
let newSegments = 0;
let score = 0;

let root = document.querySelector(':root');
const gameBoard = document.getElementById("game-board");
const snakeEl = document.getElementsByClassName('snake');
const snakeColorInput = document.getElementById("snake__color");
const foodEl = document.getElementsByClassName('food');
const foodColorInput = document.getElementById('food__color');
const gridColorInput = document.getElementById('grid__color');
const snakeSpeedInput = document.getElementById('snake__speed');
const snakeScoreEl = document.querySelector(".score");

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

function gridSize() {
    GRID_SIZE = gridSizeInput.value
    gameBoard.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
}

function snakeSpeed() {
    SNAKE_SPEED = snakeSpeedInput.value;
}

gridSizeInput.addEventListener("input", () => {
    gridSize();
})
gridSize();

snakeSpeedInput.addEventListener("input", () => {
    snakeSpeed();
})
snakeSpeed();

snakeColorInput.addEventListener("input", () => {
    root.style.setProperty('--snake__color', snakeColorInput.value);
})
root.style.setProperty('--snake__color', snakeColorInput.value);

foodColorInput.addEventListener("input", () => {
    root.style.setProperty('--food__color', foodColorInput.value);
})
root.style.setProperty('--food__color', foodColorInput.value);

gridColorInput.addEventListener("input", () => {
    root.style.setProperty('--grid__color', gridColorInput.value);
})
root.style.setProperty('--grid__color', gridColorInput.value);


function main(currentTime) {
    if (gameOver) {
        if (confirm(`GAME OVER\n\nYou lost.\nYour score was ${score} Press ok to restart`)) {
            window.location.reload();
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            if (lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: -1 }
            break;
        case 'ArrowDown':
        case 's':
            if (lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: 1 }
            break;
        case 'ArrowLeft':
        case 'a':
            if (lastInputDirection.x !== 0) break
            inputDirection = { x: -1, y: 0 }
            break;
        case 'ArrowRight':
        case 'd':
            if (lastInputDirection.x !== 0) break
            inputDirection = { x: 1, y: -0 }
            break;
    }
})

function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}

function updateSnake() {
    addSegments();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

function drawSnake(gameBoard) {
    snakeBody.forEach(element => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    })
}

function expandSnake(amount) {
    newSegments += amount;
}

function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

function getSnakeHead() {
    return snakeBody[0];
}

function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }

    newSegments = 0;
}

function updateFood() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        score++;
        snakeScoreEl.textContent = "Score: " + score;
        food = getRandomFoodPosition();
    }
}

function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPostion();
    }
    return newFoodPosition;
}

function randomGridPostion() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

function update() {
    updateSnake();
    updateFood();
    checkForDeath();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function outsideGrid(position) {
    return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE
    )
}

function checkForDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

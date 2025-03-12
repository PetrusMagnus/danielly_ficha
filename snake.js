const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("scoreDisplay");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let gameRunning = false;

function gameLoop() {
    if (!gameRunning) return;

    update();
    draw();
    setTimeout(gameLoop, 100);
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Verifica colisão com as paredes
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        resetGame();
        return;
    }

    // Verifica colisão com o próprio corpo
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
        return;
    }

    // Adiciona a nova cabeça
    snake.unshift(head);

    // Verifica se comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = "Pontuação: " + score;
        placeFood();
    } else {
        snake.pop();
    }
}

function draw() {
    // Limpa o canvas
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha a cobrinha
    ctx.fillStyle = "#e74c3c";
    snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

    // Desenha a comida
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.textContent = "Pontuação: 0";
    gameRunning = false;
    startButton.textContent = "Reiniciar Jogo";
}

startButton.addEventListener("click", () => {
    if (!gameRunning) {
        gameRunning = true;
        startButton.textContent = "Jogo Rodando...";
        gameLoop();
    }
});

window.addEventListener("keydown", e => {
    switch (e.key.toLowerCase()) {
        case "w":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "s":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "a":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "d":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

placeFood();
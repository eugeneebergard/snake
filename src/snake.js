"use strict";
const score = document.getElementById('score');
const canvas = document.getElementById('game');
const bordersBtn = document.getElementById('borders-btn');
const bordersStateDisplay = document.getElementById('state-borders');
const context = canvas.getContext('2d');
const grid = 16;
let count = 0;
let gameSpeed = 4;
let applesEaten = 0;
let stateBorders = false;
const snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
const apple = {
    x: 320,
    y: 320
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function createApple() {
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
}
function restart() {
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    applesEaten = 0;
    score.textContent = applesEaten.toString();
    createApple();
}
function toggleBorders() {
    stateBorders = !stateBorders;
    if (stateBorders) {
        bordersStateDisplay.textContent = 'on';
        canvas.classList.add('borders_on');
        canvas.classList.remove('borders_off');
    }
    else {
        bordersStateDisplay.textContent = 'off';
        canvas.classList.add('borders_off');
        canvas.classList.remove('borders_on');
    }
    restart();
}
function loop() {
    requestAnimationFrame(loop);
    if (++count < gameSpeed)
        return;
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.x < 0)
        stateBorders ? restart() : snake.x = canvas.width - grid;
    else if (snake.x >= canvas.width)
        stateBorders ? restart() : snake.x = 0;
    if (snake.y < 0)
        stateBorders ? restart() : snake.y = canvas.height - grid;
    else if (snake.y >= canvas.height)
        stateBorders ? restart() : snake.y = 0;
    snake.cells.unshift({ x: snake.x, y: snake.y });
    snake.cells.length > snake.maxCells && snake.cells.pop();
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = 'green';
    snake.cells.forEach((cell, index) => {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            createApple();
            applesEaten++;
            score.textContent = applesEaten.toString();
        }
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                restart();
            }
        }
    });
}
document.addEventListener('keydown', (e) => {
    switch (e.which) {
        case 27:
            restart();
            break;
        case 32:
            gameSpeed = 2;
            break;
        case 37:
            if (snake.dx === 0) {
                snake.dx = -grid;
                snake.dy = 0;
            }
            break;
        case 38:
            if (snake.dy === 0) {
                snake.dy = -grid;
                snake.dx = 0;
            }
            break;
        case 39:
            if (snake.dx === 0) {
                snake.dx = grid;
                snake.dy = 0;
            }
            break;
        case 40:
            if (snake.dy === 0) {
                snake.dy = grid;
                snake.dx = 0;
            }
            break;
    }
});
document.addEventListener('keyup', (e) => {
    if (e.which === 32) {
        gameSpeed = 4;
    }
});
bordersBtn.addEventListener('click', () => {
    toggleBorders();
});
requestAnimationFrame(loop);
//# sourceMappingURL=snake.js.map
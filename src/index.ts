import { ISnake, IApple } from "./snake.types";

const canvas = <HTMLCanvasElement>document.getElementById('game');
const context = <CanvasRenderingContext2D>canvas.getContext('2d');
const scoreCounter = <HTMLElement>document.getElementById('score__counter');
const modeButton = <HTMLButtonElement>document.getElementById('mode');
const stateModeButton = <HTMLElement>document.getElementById('mode__state');

const grid: number = 16;
let count: number = 0;
let gameSpeed: number = 4;
let applesEaten: number = 0;
let modeWithBorders: boolean = false;

const snake: ISnake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
}

const apple: IApple = {
  x: 320,
  y: 320
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createApple(): void {
  apple.x = getRandomInt(0, 25) * grid;
  apple.y = getRandomInt(0, 25) * grid;
}

function restart(): void {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;

  applesEaten = 0;
  scoreCounter.textContent = applesEaten.toString();

  createApple();
}

function redrawGame(text: string, addClass: string, removeClass: string): void {
  stateModeButton.textContent = text;
  canvas.classList.add(addClass);
  canvas.classList.remove(removeClass);
}

function toggleBorders() {
  modeWithBorders = !modeWithBorders;

  modeWithBorders ?
    redrawGame('on', 'borders_on', 'borders_off'):
    redrawGame('off', 'borders_off', 'borders_on');

  restart();
}

function loop(): void {
  requestAnimationFrame(loop);

  if (++count < gameSpeed) return;

  count = 0;

  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) modeWithBorders ? restart() : snake.x = canvas.width - grid;
  else if (snake.x >= canvas.width) modeWithBorders ? restart() : snake.x = 0;

  if (snake.y < 0) modeWithBorders ? restart() : snake.y = canvas.height - grid;
  else if (snake.y >= canvas.height) modeWithBorders ? restart() : snake.y = 0;

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
      scoreCounter.textContent = applesEaten.toString();
    }
    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        restart();
      }
    }
  });
}

document.addEventListener('keydown', (e) => {
  switch (e.which){
    case 16:
      // Shift
      gameSpeed = 2;
      break;
    case 27:
      // Escape
      restart();
      break
    case 37:
      // ?????????????? ??????????
      if (snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
      }
      break;
    case 38:
      // ?????????????? ??????????
      if (snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
      }
      break;
    case 39:
      // ?????????????? ????????????
      if (snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
      }
      break;
    case 40:
      // ?????????????? ????????
      if (snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
      }
      break;
  }
});

document.addEventListener('keyup', (e) => {
  if(e.which === 16) {
    gameSpeed = 4;
  }
});

modeButton.addEventListener('click', () => {
  toggleBorders();
});

requestAnimationFrame(loop);

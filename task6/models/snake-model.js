"use strict";
class SnakeModel {
  constructor() { this.size = 20; this.reset(); this.gameOver = true; this.message = "Стрелки клавиатуры или кнопки ниже. Не касайтесь стен и себя."; }
  reset() {
    this.snake = [{x:8,y:10}, {x:7,y:10}, {x:6,y:10}]; this.direction = {x:1,y:0}; this.pendingDirection = this.direction;
    this.apple = this.spawnApple(); this.score = 0; this.gameOver = false; this.message = "Игра идёт. Управляйте стрелками.";
  }
  spawnApple() {
    const free = [];
    for (let y = 0; y < this.size; y++) for (let x = 0; x < this.size; x++) if (!this.snake.some(s => s.x === x && s.y === y)) free.push({x,y});
    return free.length ? free[Math.floor(Math.random() * free.length)] : null;
  }
  changeDirection(name) {
    const next = {up:{x:0,y:-1}, down:{x:0,y:1}, left:{x:-1,y:0}, right:{x:1,y:0}}[name];
    if (next && !(next.x === -this.direction.x && next.y === -this.direction.y)) this.pendingDirection = next;
  }
  checkCollision(head, growing) {
    return head.x < 0 || head.y < 0 || head.x >= this.size || head.y >= this.size || this.snake.slice(0, growing ? this.snake.length : -1).some(s => s.x === head.x && s.y === head.y);
  }
  update() {
    if (this.gameOver) return;
    this.direction = this.pendingDirection;
    const head = {x:this.snake[0].x + this.direction.x, y:this.snake[0].y + this.direction.y};
    const growing = head.x === this.apple.x && head.y === this.apple.y;
    if (this.checkCollision(head, growing)) { this.gameOver = true; this.message = `Игра окончена. Счёт: ${this.score}`; return; }
    this.snake.unshift(head);
    if (growing) {
      this.score++; this.apple = this.spawnApple();
      if (!this.apple) { this.gameOver = true; this.message = `Победа! Всё поле заполнено. Счёт: ${this.score}`; }
    } else this.snake.pop();
  }
}
if (typeof module !== "undefined") module.exports = {SnakeModel};

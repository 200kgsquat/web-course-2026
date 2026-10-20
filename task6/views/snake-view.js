"use strict";
class SnakeView {
  constructor() { this.canvas = document.querySelector("#game"); this.ctx = this.canvas.getContext("2d"); }
  bind({onStart, onDirection}) {
    document.querySelector("#start").addEventListener("click", onStart);
    document.querySelectorAll("[data-direction]").forEach(button => button.addEventListener("click", () => onDirection(button.dataset.direction)));
    window.addEventListener("keydown", event => { const name = {ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"}[event.key]; if (name) { event.preventDefault(); onDirection(name); } });
  }
  draw({size, snake, apple, score, message}) {
    const ctx = this.ctx, cell = this.canvas.width / size;
    ctx.fillStyle = "#142137"; ctx.fillRect(0,0,400,400); ctx.strokeStyle = "#253550";
    for (let i = 0; i <= size; i++) { ctx.beginPath(); ctx.moveTo(i*cell,0); ctx.lineTo(i*cell,400); ctx.moveTo(0,i*cell); ctx.lineTo(400,i*cell); ctx.stroke(); }
    if (apple) { ctx.fillStyle = "#ff6687"; ctx.fillRect(apple.x*cell+3,apple.y*cell+3,14,14); }
    snake.forEach((s,i) => { ctx.fillStyle = i === 0 ? "#a5f9cc" : "#39bc88"; ctx.fillRect(s.x*cell+1,s.y*cell+1,18,18); });
    document.querySelector("#score").textContent = `Счёт: ${score}`; document.querySelector("#status").textContent = message;
  }
}

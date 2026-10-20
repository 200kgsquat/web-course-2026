"use strict";
class SnakeController {
  constructor(model, view) { this.model = model; this.view = view; this.interval = 150; this.lastMoveTime = 0; this.frameId = null; }
  init() {
    this.view.bind({onStart: () => this.start(), onDirection: name => this.model.changeDirection(name)});
    window.addEventListener("pagehide", () => cancelAnimationFrame(this.frameId)); this.view.draw(this.model);
  }
  start() { cancelAnimationFrame(this.frameId); this.model.reset(); this.lastMoveTime = performance.now(); this.view.draw(this.model); this.frameId = requestAnimationFrame(time => this.loop(time)); }
  loop(time) {
    if (this.model.gameOver) return;
    if (time - this.lastMoveTime >= this.interval) { this.model.update(); this.lastMoveTime = time; }
    this.view.draw(this.model);
    if (!this.model.gameOver) this.frameId = requestAnimationFrame(next => this.loop(next));
  }
}

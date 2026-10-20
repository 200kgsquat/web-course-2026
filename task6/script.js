"use strict";
// Composition root: only create and connect the three MVC layers.
const app = new SnakeController(new SnakeModel(), new SnakeView());
app.init();

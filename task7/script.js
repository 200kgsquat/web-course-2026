"use strict";
// Composition root: only create and connect the three MVC layers.
const app = new PostsController(new PostsModel(), new PostsView());
app.init();

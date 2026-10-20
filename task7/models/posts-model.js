"use strict";
class PostsModel {
  constructor() { this.posts = []; this.page = 1; this.loading = false; this.finished = false; this.failed = false; this.query = ""; this.error = ""; }
  get canLoad() { return !this.loading && !this.finished; }
  get visible() { return this.posts.filter(post => post.title.toLowerCase().includes(this.query)); }
  setQuery(query) { this.query = query.trim().toLowerCase(); }
  async loadMore() {
    if (!this.canLoad) return;
    this.loading = true; this.failed = false; this.error = "";
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=10`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const batch = await response.json();
      if (!Array.isArray(batch) || batch.some(post => typeof post.title !== "string")) throw new Error("Некорректный ответ сервера");
      this.posts.push(...batch); this.page++; this.finished = batch.length < 10 || this.posts.length >= 100;
    } catch (error) { this.failed = true; this.error = error.message; }
    finally { this.loading = false; }
  }
}
if (typeof module !== "undefined") module.exports = {PostsModel};

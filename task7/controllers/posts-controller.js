"use strict";
class PostsController {
  constructor(model, view) { this.model = model; this.view = view; this.debounceTimer = null; }
  init() {
    this.view.bind({onMore: () => { if (!this.model.failed && !this.model.query) this.load(); }, onRetry: () => this.load(), onSearch: query => this.search(query)});
    window.addEventListener("pagehide", () => { clearTimeout(this.debounceTimer); this.view.destroy(); }); this.load();
  }
  render() { this.view.render({posts:this.model.visible, loading:this.model.loading, finished:this.model.finished, failed:this.model.failed, error:this.model.error, total:this.model.posts.length}); }
  async load() { if (!this.model.canLoad) return; const request = this.model.loadMore(); this.render(); await request; this.render(); }
  search(query) { clearTimeout(this.debounceTimer); this.debounceTimer = setTimeout(() => { this.model.setQuery(query); this.render(); }, 300); }
}

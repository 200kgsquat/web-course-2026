"use strict";
class PostsView {
  bind({onMore, onRetry, onSearch}) {
    this.observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) onMore(); }, {rootMargin:"200px"});
    this.observer.observe(document.querySelector("#sentinel"));
    document.querySelector("#retry").addEventListener("click", onRetry);
    document.querySelector("#search").addEventListener("input", event => onSearch(event.target.value));
  }
  destroy() { this.observer.disconnect(); }
  render({posts, loading, finished, failed, error, total}) {
    const container = document.querySelector("#posts"); container.replaceChildren();
    posts.forEach(post => {
      const card = document.createElement("article"); card.className = "card";
      const title = document.createElement("h2"), body = document.createElement("p"), author = document.createElement("small");
      title.textContent = post.title; body.textContent = post.body; author.textContent = `Автор: ${post.userId} · Пост: ${post.id}`;
      card.append(title,body,author); container.append(card);
    });
    document.querySelector("#retry").hidden = !failed;
    document.querySelector("#status").textContent = loading ? "Загрузка…" : failed ? `Не удалось загрузить посты. Проверьте интернет. ${error}` : finished ? "Больше постов нет" : `Загружено: ${total}`;
  }
}

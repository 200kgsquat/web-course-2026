# MVC в дополнении 6–16

- task6: models/snake-model.js — движение, еда, столкновения; views/snake-view.js — Canvas; controllers/snake-controller.js — ввод, игровой цикл и координация.
- task7: models/posts-model.js — данные и загрузка; views/posts-view.js — DOM; controllers/posts-controller.js — события и debounce.
- task8-9: server/models — SQL и валидация; server/controllers — HTTP; server/routes — маршруты. client/models, views, controllers — отдельный MVC-клиент.
- task10-11: src/models — данные; src/controllers — хуки состояния и действий; src/views — JSX.
- task12-13: models и controllers — сервер; client/models, client/controllers, client/views — браузер.
- task15-16: сервис models/todo.service.ts, компонент controllers/app.component.ts, шаблон views/app.component.html.

script.js в №6–7 — только точка сборки. Дополнительные файлы MVC изменяют буквальное требование исходного PDF об одном JS-файле в этих работах.

Действие пользователя → Controller → Model → Controller → View. Модели №6–7 тестируются без DOM. Тесты №14 проверяют только код из дополнения и не требуют подмены ваших лаб 0–5.

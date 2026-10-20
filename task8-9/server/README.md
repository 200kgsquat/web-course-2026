Установка: `npm install`. Запуск: `npm start` (порт 3001). Клиент: http://localhost:3001.
Проверка 6 роутов и ошибок: `npm test`; сохранённый лог — API-RESULTS.txt.
DATABASE_PATH позволяет выбрать другой SQLite-файл; тесты используют отдельную временную базу и не меняют пользовательские данные.

Архитектура: models/money-model.js — запросы и валидация, controllers/finance-controller.js — HTTP-обработчики, routes/finance-routes.js — привязка URL. server.js только собирает приложение.

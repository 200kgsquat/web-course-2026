# Zen-Money: Express + SQLite
Из этой папки: `cd server`, `npm install`, `npm start`; затем открыть http://localhost:3001. Сервер одновременно отдаёт клиент, второй процесс не обязателен.
Альтернатива: запустить `npm start` из корня курса и открыть http://localhost:8080/task8-9/client/ при работающем API на 3001.
База создаётся автоматически в server/database.sqlite; 3 начальные категории добавляются только в пустую базу. Данные операций — только SQLite, localStorage содержит только фильтры.
Фильтры передаются серверу и выполняются SQL WHERE. Для проверки API: `cd server && npm test`, лог в API-RESULTS.txt.
Деплой требует сервера Node и постоянного диска для SQLite; GitHub Pages подходит только для клиента, адрес API в client/models/api.js тогда нужно заменить на адрес опубликованного backend. Внешний деплой в этой работе не выполнен.

MVC сервера: `server/models/` (SQL), `server/controllers/` (HTTP), `server/routes/` (маршруты); клиент: `client/models/`, `client/views/`, `client/controllers/`. main.js — точка сборки. [MVC.md](../labs-6-16/MVC.md).

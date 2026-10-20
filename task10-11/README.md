Todo на React: 6 компонентов, состояние в App, props, стабильный key, три фильтра и немутирующая сортировка.
Запуск: `npm install`, `npm run dev` → http://localhost:5173. Сборка: `npm run build`.
useState с ленивым загрузчиком восстанавливает данные при создании App; useEffect сохраняет изменения в localStorage. Тесты компонентов и логики — в ../task14 (`npm install`, `npm test`).

MVC: `src/models/todo-model.js` — данные и операции; `src/controllers/` — useState/useEffect и обработчики; `src/views/` — JSX. App соединяет View и контроллер. Состояние хука принадлежит App. [MVC.md](../labs-6-16/MVC.md).

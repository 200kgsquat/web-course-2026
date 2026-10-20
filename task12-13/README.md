# Zen-Money на Next.js
Установка: `npm install`; разработка: `npm run dev` → http://localhost:3000. Production: `npm run build`, затем `npm start`. Рекомендуется Node.js 24 LTS.
Роуты `/`, `/add`, `/transaction/[id]`; API `/api/categories`, `/api/transactions`, `/api/transactions/[id]`. База — lib/database.sqlite, создаётся автоматически. Внутренние запросы относительные; Express не нужен.
CSR: Dashboard и формы загружают данные и реагируют на действия в браузере. SSR: сервер создаёт оболочку страниц, а динамическая страница получает id на сервере; сами финансовые данные запрашивает клиент. SSG: статические оболочки главной и add могут быть подготовлены при build, но это не означает, что операции зашиты в сборку.
Express и Route Handlers принимают HTTP-запросы, валидируют данные и возвращают JSON; в Express API — отдельный сервер на 3001, здесь он входит в приложение Next.js на 3000. SQLite-соединение вынесено в models/db.js и используется всеми обработчиками.
## Публикация
Внешний деплой не выполнен, ссылки Vercel нет. В Vercel выбирается Root Directory `task12-13`; для временной демонстрации можно задать DATABASE_PATH=/tmp/zen-money.sqlite. Такой файл не гарантирует сохранность между экземплярами/перезапусками, и разные экземпляры могут видеть разные данные. Практический эффект на Vercel в этой сессии не проверен. Для настоящего постоянного хранения этой версии нужен Node-host с постоянным диском; для Vercel потребуется перенос БД на внешний сервис.
Документация: https://nextjs.org/docs/app/api-reference/file-conventions/route и https://vercel.com/docs/functions/runtimes/node-js.

MVC: серверные Model — `models/`, Controller — `controllers/`, а `app/api/` маршрутизирует запросы. Клиентские Model/Controller/View — `client/models/`, `client/controllers/`, `client/views/`. `components/` соединяет хуки-контроллеры с JSX-представлениями. [Карта MVC](../labs-6-16/MVC.md). База остаётся в lib/database.sqlite; перенос исходников не меняет этот путь.

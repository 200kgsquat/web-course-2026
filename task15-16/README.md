Todo на Angular 20: standalone-компонент, FormsModule и [(ngModel)], *ngFor, *ngIf, сервис @Injectable и внедрение через конструктор.
Запуск: `npm install`, `npm start` → http://localhost:4200. Сборка: `npm run build`. Node.js 24 LTS; глобальная установка Angular CLI не нужна, CLI — локальная зависимость.
В React данные Todo лежат в useState родителя и передаются через props; здесь данные и операции лежат в TodoService, который Angular внедряет в компонент. [(ngModel)] синхронизирует поле и свойство text в обе стороны, а в React это явно заданные value и onChange. *ngFor/*ngIf управляют шаблоном, вместо JSX с map и условными выражениями.
Защита лабораторной 16: DEFENSE.md; интерактивные слайды: presentation.html. Проект для защиты — локальный Zen-Money Next.js.

MVC: `src/app/models/todo.service.ts` — Model, `src/app/controllers/app.component.ts` — Controller, `src/app/views/app.component.html` — View. [MVC.md](../labs-6-16/MVC.md).

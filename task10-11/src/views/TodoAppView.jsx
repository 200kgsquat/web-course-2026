import React from 'react';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';
import Filters from './Filters.jsx';
import Stats from './Stats.jsx';
export default function TodoAppView({tasks, stats, visible, filter, sort, storageError, add, toggle, remove, setFilter, setSort}) {
 return <main><header><p className="badge">Лабораторные 10–11</p><h1>Todo на React</h1><p className="muted">Компоненты, состояние, сортировка и сохранение</p></header><section><TodoForm onAdd={add}/><Filters value={filter} onChange={setFilter}/><label>Сортировка<select value={sort} onChange={event=>setSort(event.target.value)}><option value="newest">Сначала новые</option><option value="oldest">Сначала старые</option><option value="alpha">По алфавиту</option></select></label><Stats {...stats}/><p className="error">{storageError}</p><TodoList tasks={visible} onToggle={toggle} onDelete={remove}/></section></main>;
}

import {useState, useEffect} from 'react';
import {loadTasks, saveTasks, visibleTasks, createTask, toggleTask, deleteTask, taskStats} from '../models/todo-model.js';
export function useTodoController() {
  const [tasks, setTasks] = useState(loadTasks), [filter, setFilter] = useState('all'), [sort, setSort] = useState('newest'), [storageError, setStorageError] = useState('');
  useEffect(() => { try { saveTasks(tasks); setStorageError(''); } catch { setStorageError('Не удалось сохранить задачи в браузере. Текущая сессия продолжает работать.'); } }, [tasks]);
  function add(text) { const task = createTask(text); setTasks(items => [...items, task]); setFilter('all'); }
  function toggle(id) { setTasks(items => toggleTask(items, id)); }
  function remove(id) { setTasks(items => deleteTask(items, id)); }
  return {tasks, stats:taskStats(tasks), visible:visibleTasks(tasks, filter, sort), filter, sort, storageError, add, toggle, remove, setFilter, setSort};
}

export function visibleTasks(tasks,filter,sort) {
 const visible=tasks.filter(t=>filter==='all'||(filter==='completed'?t.completed:!t.completed));
 return [...visible].sort((a,b)=>sort==='alpha'?a.text.localeCompare(b.text,'ru'):sort==='oldest'?a.createdAt-b.createdAt:b.createdAt-a.createdAt);
}
export function loadTasks() {
 try{const data=JSON.parse(localStorage.getItem('react-todos')||'[]');return Array.isArray(data)?data.filter(t=>t&&typeof t.id==='string'&&typeof t.text==='string'&&typeof t.completed==='boolean'&&Number.isFinite(t.createdAt)):[];}catch{return [];}
}

export function createTask(text) { return {id:crypto.randomUUID(), text:text.trim(), completed:false, createdAt:Date.now()}; }
export function toggleTask(tasks, id) { return tasks.map(t => t.id === id ? {...t, completed:!t.completed} : t); }
export function deleteTask(tasks, id) { return tasks.filter(t => t.id !== id); }
export function saveTasks(tasks) { localStorage.setItem('react-todos', JSON.stringify(tasks)); }

export function taskStats(tasks) {const completed=tasks.filter(t=>t.completed).length;return {completed, remaining:tasks.length-completed};}

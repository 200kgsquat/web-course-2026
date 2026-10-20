import React from 'react';
/** task: {id, text, completed}; callbacks receive task.id. */
export default function TodoItem({task,onToggle,onDelete}) {
 return <li className={task.completed?'completed':''}><input type="checkbox" aria-label={'Выполнить: '+task.text} checked={task.completed} onChange={()=>onToggle(task.id)}/><span>{task.text}</span><button className="danger" onClick={()=>onDelete(task.id)}>Удалить</button></li>;
}

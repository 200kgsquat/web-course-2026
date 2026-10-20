import React from 'react';
import {useTodoFormController} from '../controllers/useTodoFormController.js';
/** View: renders form state and delegates actions to its controller. */
export default function TodoForm({onAdd}) {
  const {text, error, setText, submit} = useTodoFormController(onAdd);
  return <><form onSubmit={submit}><input aria-label="Новая задача" value={text} onChange={event => setText(event.target.value)} placeholder="Что нужно сделать?"/><button>Добавить</button></form><p className="error" role="status">{error}</p></>;
}

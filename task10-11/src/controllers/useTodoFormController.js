import {useState} from 'react';
export function useTodoFormController(onAdd) {
  const [text, setText] = useState(''), [error, setError] = useState('');
  function submit(event) { event.preventDefault(); const value = text.trim(); if (!value) { setError('Введите текст задачи'); return; } onAdd(value); setText(''); setError(''); }
  return {text, error, setText, submit};
}

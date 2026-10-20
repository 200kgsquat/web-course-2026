"use client";
export default function CategoryFormView({name, type, message, busy, setName, setType, submit}) {
return <form onSubmit={submit}><input required maxLength="80" aria-label="Название категории" placeholder="Своя категория" value={name} onChange={e=>setName(e.target.value)}/><select aria-label="Тип категории" value={type} onChange={e=>setType(e.target.value)}><option value="expense">Расход</option><option value="income">Доход</option></select><button disabled={busy}>Создать категорию</button><p role="status">{message}</p></form>;}

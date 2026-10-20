"use client";
import Link from 'next/link';
import TransactionForm from '../../components/TransactionForm';
export default function TransactionDetailView({id, item, error, version, onSaved}) {
return <section><h2>Операция #{id}</h2>{error?<p className="error" role="status">{error}</p>:item?<><p>{item.type==='income'?'Доход':'Расход'}: {item.amount} · {item.category_name} · {item.date}</p><p>{item.comment||'Без комментария'}</p><h3>Изменить операцию</h3><TransactionForm key={version} initial={item} onSaved={onSaved}/><p>После сохранения данные обновятся выше.</p></>:<p>Загрузка…</p>}<Link href="/">Назад к списку</Link></section>;}

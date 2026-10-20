"use client";
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {request} from '../models/api';
import {transactionPayload} from '../models/finance-model';
export function useTransactionFormController(initial, onSaved) {
 const router=useRouter();const [categories,setCategories]=useState([]),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const [data,setData]=useState({amount:initial?.amount||'',type:initial?.type||'expense',category_id:String(initial?.category_id||''),date:initial?.date||new Date().toLocaleDateString('sv-SE'),comment:initial?.comment||''});
 useEffect(()=>{let alive=true;async function load(){try{const cats=await request('/categories');if(alive){setCategories(cats);setData(old=>({...old,category_id:old.category_id||String(cats.find(c=>c.type===old.type)?.id||'')}));}}catch(e){if(alive)setError(e.message);}}load();return()=>{alive=false;};},[]);
 function change(key,value){setData(old=>({...old,[key]:value,...(key==='type'?{category_id:String(categories.find(c=>c.type===value)?.id||'')}: {})}));}

  async function submit(event) {
    event.preventDefault(); if (busy) return; setError(''); setBusy(true);
    try { const payload = transactionPayload(data); const saved = await request(initial ? '/transactions/'+initial.id : '/transactions', initial ? 'PUT' : 'POST', payload); if (onSaved) onSaved(saved); else router.push('/'); }
    catch (error) { setError(error.message); }
    finally { setBusy(false); }
  }
  return {categories:categories.filter(c=>c.type===data.type), error, busy, data, change, submit, editing:!!initial};
}

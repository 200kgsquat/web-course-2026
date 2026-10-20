"use client";
import {useState, useEffect, useRef} from 'react';
import {request} from '../models/api';
import {summarize} from '../models/finance-model';
export function useDashboardController() {
 const [items,setItems]=useState([]),[categories,setCategories]=useState([]),[filters,setFilters]=useState({type:'',category_id:'',from:'',to:''}),[error,setError]=useState(''),[loading,setLoading]=useState(false),[version,setVersion]=useState(0),[ready,setReady]=useState(false);const requestNumber=useRef(0);
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem('next-filters')||'{}');if(saved&&typeof saved==='object')setFilters(old=>({...old,...Object.fromEntries(['type','category_id','from','to'].map(k=>[k,typeof saved[k]==='string'?saved[k]:'']))}));}catch{}setReady(true);},[]);
 useEffect(()=>{if(!ready)return;let alive=true;const number=++requestNumber.current;async function load(){setLoading(true);setError('');try{const query=new URLSearchParams(Object.entries(filters).filter(([,v])=>v));const [rows,cats]=await Promise.all([request('/transactions?'+query),request('/categories')]);if(alive&&number===requestNumber.current){setItems(rows);setCategories(cats);}}catch(e){if(alive)setError(e.message);}finally{if(alive)setLoading(false);}}load();try{localStorage.setItem('next-filters',JSON.stringify(filters));}catch{}return()=>{alive=false;};},[filters,version,ready]);
 async function remove(id){try{await request('/transactions/'+id,'DELETE');setVersion(v=>v+1);}catch(e){setError(e.message);}}

  function changeFilter(key, value) { setFilters(old => ({...old, [key]:value})); }
  function resetFilters() { setFilters({type:'', category_id:'', from:'', to:''}); }
  function refresh() { setVersion(v => v + 1); }
  return {items, categories, filters, error, loading, remove, changeFilter, resetFilters, refresh, ...summarize(items)};
}

"use client";
import {useState, useEffect} from 'react';
import {request} from '../models/api';
export function useDetailController(id) {
const [item,setItem]=useState(null),[error,setError]=useState(''),[version,setVersion]=useState(0);useEffect(()=>{let alive=true;async function load(){try{const row=await request('/transactions/'+id);if(alive){setItem(row);setError('');}}catch(e){if(alive)setError(e.message);}}load();return()=>{alive=false;};},[id,version]);function onSaved(saved) { setItem(saved); setVersion(v => v + 1); }
return {item, error, version, onSaved};
}

"use client";
import {useState} from 'react';
import {request} from '../models/api';
export function useCategoryController(onSaved) {
const [name,setName]=useState(''),[type,setType]=useState('expense'),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);async function submit(e){e.preventDefault();if(busy)return;setBusy(true);try{await request('/categories','POST',{name:name.trim(),type});setName('');setMessage('Категория создана');onSaved();}catch(e){setMessage(e.message);}finally{setBusy(false);}}return {name, type, message, busy, setName, setType, submit};
}

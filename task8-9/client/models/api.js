const BASE = location.port === '3001' ? '' : 'http://localhost:3001';
async function request(path, method='GET', data) {
 try {
  const response=await fetch(BASE+path,{method,headers:{'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data)});
  if(response.status===204)return null;
  const result=await response.json();if(!response.ok)throw new Error(result.error||`HTTP ${response.status}`);return result;
 }catch(error){throw new Error(error.message==='Failed to fetch'?'Сервер недоступен. Запустите task8-9/server: npm start':error.message);}
}
export const getCategories=()=>request('/categories');
export const createCategory=data=>request('/categories','POST',data);
export const getTransactions=filters=>request('/transactions?'+new URLSearchParams(filters));
export const createTransaction=data=>request('/transactions','POST',data);
export const updateTransaction=(id,data)=>request('/transactions/'+id,'PUT',data);
export const deleteTransaction=id=>request('/transactions/'+id,'DELETE');

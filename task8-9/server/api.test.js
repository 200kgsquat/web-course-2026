const {test,after}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const os=require('node:os');const path=require('node:path');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'zen-test-'));process.env.DATABASE_PATH=path.join(tmp,'database.sqlite');
const app=require('./server');const db=require('./db');const server=app.listen(0);let createdId,categoryId;
const base='http://127.0.0.1:'+server.address().port;
async function call(method,route,data,status){const res=await fetch(base+route,{method,headers:{'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data)});assert.equal(res.status,status,method+' '+route);const body=res.status===204?null:await res.json();console.log(method,route,'→',res.status,JSON.stringify(body));return body;}
test('all required routes: CRUD and SQL filters',async()=>{
 const cats=await call('GET','/categories',undefined,200);assert.equal(cats.length,3);
 const category=await call('POST','/categories',{name:'Тест',type:'expense'},201);categoryId=category.id;
 const row=await call('POST','/transactions',{amount:123.45,category_id:categoryId,date:'2026-10-06',comment:'Создание'},201);createdId=row.id;
 const income=await call('POST','/transactions',{amount:1000,category_id:cats.find(c=>c.type==='income').id,date:'2026-09-01'},201);
 const rows=await call('GET','/transactions',undefined,200);assert.equal(rows.length,2);
 assert.equal((await call('GET','/transactions?type=expense&category_id='+categoryId+'&from=2026-10-01&to=2026-10-31',undefined,200)).length,1);
 assert.equal((await call('GET','/transactions?type=income&from=2026-10-01',undefined,200)).length,0);
 const changed=await call('PUT','/transactions/'+createdId,{amount:200,category_id:categoryId,date:'2026-10-07',comment:'Изменение'},200);assert.equal(changed.amount,200);
 await call('DELETE','/transactions/'+createdId,undefined,204);await call('DELETE','/transactions/'+income.id,undefined,204);
 assert.equal((await call('GET','/transactions',undefined,200)).length,0);
});
test('server validation and 404',async()=>{
 await call('POST','/categories',{name:' ',type:'expense'},400);await call('POST','/categories',{name:'A',type:'bad'},400);
 await call('POST','/transactions',{amount:-1,category_id:categoryId,date:'2026-10-06'},400);
 await call('POST','/transactions',{amount:20,category_id:999999,date:'2026-10-06'},400);
 await call('POST','/transactions',{amount:20,category_id:categoryId,date:'2026-02-30'},400);
 await call('POST','/transactions',{amount:'20',category_id:categoryId,date:'2026-10-06'},400);
 await call('PUT','/transactions/999999',{amount:20,category_id:categoryId,date:'2026-10-06'},404);
 await call('DELETE','/transactions/999999',undefined,404);await call('GET','/transactions/999999',undefined,404);
 await call('GET','/transactions?type=wrong',undefined,400);await call('GET','/transactions?from=2026-12-01&to=2026-01-01',undefined,400);
 const bad=await fetch(base+'/transactions',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'});assert.equal(bad.status,400);
});
after(async()=>{await new Promise(resolve=>server.close(resolve));db.close();fs.rmSync(tmp,{recursive:true,force:true});});

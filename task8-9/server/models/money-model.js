const db = require('../db.js');
class ApiError extends Error { constructor(status, message) { super(message); this.status = status; } }
function fail(status, message) { throw new ApiError(status, message); }
function validDate(value) {
 if(typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
 const date = new Date(value + 'T00:00:00Z');
 return !Number.isNaN(date.getTime()) && date.toISOString().slice(0,10) === value;
}
function validId(value) { return /^\d+$/.test(String(value)) && Number.isSafeInteger(Number(value)) && Number(value)>0; }
function validateTransaction(data) {
 if(!data || typeof data.amount!=='number' || !Number.isFinite(data.amount) || data.amount<=0 || data.amount>1e12) fail(400,'Сумма должна быть числом больше 0 и не больше 1 трлн');
 if(!Number.isInteger(data.category_id) || !db.prepare('SELECT id FROM categories WHERE id=?').get(data.category_id)) fail(400,'Категория не существует');
 if(!validDate(data.date)) fail(400,'Нужна существующая дата в формате YYYY-MM-DD');
 if(data.comment!=null && (typeof data.comment!=='string'||data.comment.length>1000)) fail(400,'Комментарий: не более 1000 символов');
 return {amount:Math.round(data.amount*100)/100, category_id:data.category_id, date:data.date, comment:(data.comment||'').trim()};
}
function getCategories() { return db.prepare('SELECT * FROM categories ORDER BY id').all(); }
function createCategory(data) {
 if(!data || typeof data.name!=='string' || !data.name.trim() || data.name.trim().length>80) fail(400,'Название категории: 1–80 символов');
 if(!['income','expense'].includes(data.type)) fail(400,'Тип должен быть income или expense');
 const result=db.prepare('INSERT INTO categories(name,type) VALUES (?,?)').run(data.name.trim(),data.type);
 return db.prepare('SELECT * FROM categories WHERE id=?').get(result.lastInsertRowid);
}
const select=`SELECT t.*, c.name AS category_name, c.type FROM transactions t JOIN categories c ON c.id=t.category_id`;
function getTransaction(id) {
 if(!validId(id)) fail(400,'Некорректный ID');
 const item=db.prepare(select+' WHERE t.id=?').get(Number(id)); if(!item) fail(404,'Операция не найдена'); return item;
}
function getTransactions(query={}) {
 const where=[], values=[];
 if(query.category_id) { if(!validId(query.category_id))fail(400,'Некорректная категория');where.push('t.category_id=?');values.push(Number(query.category_id)); }
 if(query.type) { if(!['income','expense'].includes(query.type))fail(400,'Некорректный тип');where.push('c.type=?');values.push(query.type); }
 for(const [key, operator] of [['from','>='],['to','<=']]) if(query[key]) { if(!validDate(query[key]))fail(400,'Некорректная дата фильтра');where.push(`t.date ${operator} ?`);values.push(query[key]); }
 if(query.from && query.to && query.from>query.to)fail(400,'Дата «от» должна быть не позже даты «до»');
 return db.prepare(select+(where.length?' WHERE '+where.join(' AND '):'')+' ORDER BY t.date DESC, t.id DESC').all(...values);
}
function createTransaction(data) {
 const t=validateTransaction(data);
 if(t.amount<=0)fail(400,'Минимальная сумма — 0.01');
 const result=db.prepare('INSERT INTO transactions(amount,category_id,date,comment) VALUES (@amount,@category_id,@date,@comment)').run(t);
 return getTransaction(result.lastInsertRowid);
}
function updateTransaction(id, data) {
 getTransaction(id);const t=validateTransaction(data);if(t.amount<=0)fail(400,'Минимальная сумма — 0.01');
 db.prepare('UPDATE transactions SET amount=@amount,category_id=@category_id,date=@date,comment=@comment WHERE id=@id').run({...t,id:Number(id)});
 return getTransaction(id);
}
function deleteTransaction(id) { getTransaction(id);db.prepare('DELETE FROM transactions WHERE id=?').run(Number(id)); }
module.exports={getCategories,createCategory,getTransactions,getTransaction,createTransaction,updateTransaction,deleteTransaction,ApiError};

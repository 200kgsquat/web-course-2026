const currency=value=>Number(value).toLocaleString('ru-RU',{minimumFractionDigits:2,maximumFractionDigits:2});
export function showMessage(text){document.querySelector('#message').textContent=text;}
export function renderCategories(categories,type,selected='') {
 const select=document.querySelector('#transaction-form [name=category_id]');select.replaceChildren();
 categories.forEach(c=>select.add(new Option(c.name,String(c.id))));if(selected)select.value=String(selected);
}
export function renderFilterCategories(categories){const select=document.querySelector('#filters [name=category_id]');select.replaceChildren(new Option('Все',''));categories.forEach(c=>select.add(new Option(c.name,String(c.id))));}
export function renderTransactions(items,onEdit,onDelete,totals) {
 const container=document.querySelector('#transactions');container.replaceChildren();
 if(!items.length){const p=document.createElement('p');p.textContent='Операций нет. Добавьте первую или измените фильтр.';container.append(p);}
 items.forEach(item=>{const card=document.createElement('article');card.className='card';
 const title=document.createElement('strong');title.className=item.type;title.textContent=`${item.type==='income'?'+':'−'}${currency(item.amount)} · ${item.category_name}`;
 const text=document.createElement('p');text.textContent=`${item.date} · ${item.comment||'Без комментария'}`;
 const edit=document.createElement('button');edit.textContent='Редактировать';edit.addEventListener('click',()=>onEdit(item));
 const remove=document.createElement('button');remove.textContent='Удалить';remove.className='danger';remove.addEventListener('click',()=>onDelete(item.id));
 const row=document.createElement('div');row.className='row';row.append(edit,remove);card.append(title,text,row);container.append(card);});
 const {income,expense,balance}=totals;
 const summary=document.querySelector('#summary');summary.replaceChildren();
 [['Доходы',income],['Расходы',expense],['Баланс',balance]].forEach(([label,value])=>{const article=document.createElement('article'),strong=document.createElement('strong');article.textContent=label;strong.textContent=currency(value);article.append(strong);summary.append(article);});
}

export class FinanceView {
  constructor() { this.form = document.querySelector('#transaction-form'); this.filters = document.querySelector('#filters'); this.categoryForm = document.querySelector('#category-form'); }
  bind({onSave, onEdit, onDelete, onType, onCancel, onCategory, onFilter, onReset}) {
    this.onEdit = onEdit; this.onDelete = onDelete;
    this.form.addEventListener('submit', event => {
      event.preventDefault(); const f = this.form.elements;
      onSave({amount:Number(f.amount.value), category_id:Number(f.category_id.value), date:f.date.value, comment:f.comment.value.trim()});
    });
    this.form.elements.type.addEventListener('change', () => onType(this.type));
    document.querySelector('#cancel').addEventListener('click', onCancel);
    this.categoryForm.addEventListener('submit', event => { event.preventDefault(); onCategory({name:this.categoryForm.elements.name.value.trim(), type:this.categoryForm.elements.type.value}); });
    this.filters.addEventListener('submit', event => { event.preventDefault(); onFilter(Object.fromEntries([...new FormData(this.filters)].filter(([,v]) => v))); });
    document.querySelector('#reset-filter').addEventListener('click', onReset);
  }
  get type() { return this.form.elements.type.value; }
  message(text) { showMessage(text); }
  setBusy(busy) { document.querySelector('#save').disabled = busy; }
  categoryBusy(busy) { this.categoryForm.querySelector('button').disabled = busy; }
  categories(categories, selected = '') { renderCategories(categories, this.type, selected); }
  filterCategories(categories, filters) { renderFilterCategories(categories); this.setFilters(filters); }
  setFilters(filters) { for (const key of ['type','category_id','from','to']) this.filters.elements[key].value = filters[key] || ''; }
  resetForm(categories) {
    this.form.reset(); this.form.elements.date.value = new Date().toLocaleDateString('sv-SE'); this.categories(categories);
    document.querySelector('#form-title').textContent = 'Новая операция'; document.querySelector('#save').textContent = 'Добавить'; document.querySelector('#cancel').hidden = true;
  }
  edit(item, categories) {
    this.form.elements.type.value = item.type; this.categories(categories, item.category_id);
    for (const key of ['amount','date','comment']) this.form.elements[key].value = item[key] || '';
    document.querySelector('#form-title').textContent = 'Редактирование'; document.querySelector('#save').textContent = 'Сохранить'; document.querySelector('#cancel').hidden = false;
    this.form.scrollIntoView({behavior:'smooth', block:'center'});
  }
  render(items, summary) { renderTransactions(items, this.onEdit, this.onDelete, summary); }
  resetCategoryForm() { this.categoryForm.reset(); }
}

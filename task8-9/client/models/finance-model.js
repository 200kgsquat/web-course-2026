import * as api from './api.js';
export class FinanceModel {
  constructor() { this.categories = []; this.items = []; this.editingId = null; this.filters = this.loadFilters(); }
  loadFilters() {
    try { const value = JSON.parse(localStorage.getItem('zen-filters') || '{}'); return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
    catch { return {}; }
  }
  setFilters(filters) {
    if (filters.from && filters.to && filters.from > filters.to) throw new Error('Дата «от» позже даты «до»');
    this.filters = filters;
    try { localStorage.setItem('zen-filters', JSON.stringify(filters)); } catch {}
  }
  get summary() {const sum=type=>this.items.filter(t=>t.type===type).reduce((s,t)=>s+Math.round(t.amount*100),0)/100;const income=sum('income'),expense=sum('expense');return {income,expense,balance:income-expense};}
  categoriesFor(type) {return this.categories.filter(category=>category.type===type);}
  async loadCategories() { this.categories = await api.getCategories(); }
  async loadItems() { return api.getTransactions(this.filters); }
  async save(data) {
    if (!data.category_id || !Number.isFinite(data.amount) || data.amount <= 0) throw new Error('Проверьте сумму и категорию');
    if (this.editingId) return api.updateTransaction(this.editingId, data);
    return api.createTransaction(data);
  }
  async remove(id) { await api.deleteTransaction(id); if (this.editingId === id) this.editingId = null; }
  async createCategory(data) { await api.createCategory(data); await this.loadCategories(); }
}

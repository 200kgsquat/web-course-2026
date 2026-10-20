export class FinanceController {
  constructor(model, view) { this.model = model; this.view = view; this.busy = false; this.loadVersion = 0; }
  async init() {
    this.view.bind({onSave:data => this.save(data), onEdit:item => this.edit(item), onDelete:id => this.remove(id), onType:type => this.view.categories(this.model.categoriesFor(type)), onCancel:() => this.resetForm(), onCategory:data => this.createCategory(data), onFilter:filters => this.filter(filters), onReset:() => this.filter({})});
    try { await this.model.loadCategories(); this.view.filterCategories(this.model.categories, this.model.filters); this.resetForm(); await this.load(); }
    catch (error) { this.view.message(error.message); }
  }
  resetForm() { this.model.editingId = null; this.view.resetForm(this.model.categoriesFor('expense')); }
  async load() {
    const version = ++this.loadVersion;
    try { const items = await this.model.loadItems(); if (version === this.loadVersion) { this.model.items = items; this.view.render(items, this.model.summary); } }
    catch (error) { if (version === this.loadVersion) this.view.message(error.message); }
  }
  edit(item) { this.model.editingId = item.id; this.view.edit(item, this.model.categoriesFor(item.type)); }
  async save(data) {
    if (this.busy) return; this.busy = true; this.view.setBusy(true);
    try { await this.model.save(data); this.resetForm(); this.view.message('Операция сохранена'); await this.load(); }
    catch (error) { this.view.message(error.message); }
    finally { this.busy = false; this.view.setBusy(false); }
  }
  async remove(id) {
    const editing = this.model.editingId === id;
    try { await this.model.remove(id); if (editing) this.resetForm(); this.view.message('Операция удалена'); await this.load(); }
    catch (error) { this.view.message(error.message); }
  }
  async createCategory(data) {
    this.view.categoryBusy(true);
    try { await this.model.createCategory(data); this.view.categories(this.model.categoriesFor(this.view.type)); this.view.filterCategories(this.model.categories, this.model.filters); this.view.resetCategoryForm(); this.view.message('Категория создана'); }
    catch (error) { this.view.message(error.message); }
    finally { this.view.categoryBusy(false); }
  }
  async filter(filters) {
    try { this.model.setFilters(filters); this.view.setFilters(filters); this.view.message(''); await this.load(); }
    catch (error) { this.view.message(error.message); }
  }
}

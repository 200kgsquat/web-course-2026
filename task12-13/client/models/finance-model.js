export function summarize(items) {
  const sum = type => items.filter(t => t.type === type).reduce((s,t) => s + Math.round(t.amount*100), 0) / 100;
  const income = sum('income'), expense = sum('expense');
  return {income, expense, balance:income-expense};
}
export function transactionPayload(data) {
  const value = {amount:Number(data.amount), category_id:Number(data.category_id), date:data.date, comment:data.comment.trim()};
  if (!Number.isFinite(value.amount) || value.amount <= 0 || !value.category_id) throw new Error('Проверьте сумму и категорию');
  return value;
}

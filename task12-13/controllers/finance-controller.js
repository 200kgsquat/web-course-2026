import model from '../models/money-model.js';
import helpers from './http-response.cjs';
export async function getCategories() { return helpers.respond(() => model.getCategories()); }
export async function getTransactions(request) { return helpers.respond(() => model.getTransactions(Object.fromEntries(new URL(request.url).searchParams))); }
async function create(request, action) {
  try { const data = await helpers.body(request); return helpers.respond(() => action(data), 201); }
  catch (error) { return Response.json({error:error.message}, {status:error.status || 500}); }
}
export async function createCategory(request) { return create(request, model.createCategory); }
export async function createTransaction(request) { return create(request, model.createTransaction); }
export async function getTransaction(request, {params}) { const {id} = await params; return helpers.respond(() => model.getTransaction(id)); }
export async function updateTransaction(request, {params}) {
  try { const {id} = await params; const data = await helpers.body(request); return helpers.respond(() => model.updateTransaction(id, data)); }
  catch (error) { return Response.json({error:error.message}, {status:error.status || 500}); }
}
export async function deleteTransaction(request, {params}) { const {id} = await params; return helpers.respond(() => model.deleteTransaction(id), 204); }

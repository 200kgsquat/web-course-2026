const model = require('../models/money-model');
// HTTP is confined to the controller; the model knows nothing about Express.
function action(callback, status = 200) {
  return (req, res) => {
    try {
      const result = callback(req);
      if (status === 204) res.status(status).end();
      else res.status(status).json(result);
    } catch (error) {
      res.status(error.status || 500).json({error: error.status ? error.message : 'Ошибка базы данных'});
    }
  };
}
exports.getCategories = action(() => model.getCategories());
exports.createCategory = action(req => model.createCategory(req.body), 201);
exports.getTransactions = action(req => model.getTransactions(req.query));
exports.createTransaction = action(req => model.createTransaction(req.body), 201);
exports.getTransaction = action(req => model.getTransaction(req.params.id));
exports.updateTransaction = action(req => model.updateTransaction(req.params.id, req.body));
exports.deleteTransaction = action(req => model.deleteTransaction(req.params.id), 204);

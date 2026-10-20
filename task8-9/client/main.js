import {FinanceModel} from './models/finance-model.js';
import {FinanceView} from './views/finance-view.js';
import {FinanceController} from './controllers/finance-controller.js';
const app = new FinanceController(new FinanceModel(), new FinanceView());
app.init();

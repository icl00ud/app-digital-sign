const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.get('/', expenseController.getAllExpenses);
router.get('/:id', expenseController.getAllEmployeeExpensesByUserId);
router.get('/manager/:id', expenseController.getAllManagerExpensesByUserId);
router.post('/', expenseController.createExpense);
router.post('/sign', expenseController.signExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
const expenseService = require('../services/expense.service');

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await expenseService.getAllExpenses();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar as despesas.' });
    }
};

const createExpense = async (req, res) => {
    try {
        const newExpense = await expenseService.createExpense(req.body);
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar a despesa.' });
    }
};

const updateExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const updatedExpense = await expenseService.updateExpense(expenseId, req.body);
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a despesa.' });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        await expenseService.deleteExpense(expenseId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a despesa.' });
    }
};

module.exports = {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense
};
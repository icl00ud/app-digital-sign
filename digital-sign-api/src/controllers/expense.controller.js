const expenseService = require('../services/expense.service');
const db = require('../config/db.config');

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await expenseService.getAllExpenses();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar as despesas.' });
    }
};

const getAllEmployeeExpensesByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const expenses = await expenseService.getAllEmployeeExpensesByUserId(userId);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar as despesas.' });
    }
}

const getAllManagerExpensesByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const expenses = await expenseService.getAllManagerExpensesByUserId(userId);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar as despesas.' });
    }
}

const createExpense = async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ error: 'Nenhum arquivo enviado.' });

        const result = await expenseService.createExpense(req.body, req.file);
        console.log('result', result)
        res.status(201).json({ message: 'Despesa criada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a despesa.' });
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

const signExpense = async (req, res) => {
    try {
        const result = await expenseService.signExpense(req.body);
        res.status(200).json({ message: 'Despesa assinada com sucesso.' });
    } catch (error) {
        res.status(500).json
    }
};

module.exports = {
    getAllExpenses,
    getAllManagerExpensesByUserId,
    getAllEmployeeExpensesByUserId,
    createExpense,
    signExpense,
    deleteExpense
};
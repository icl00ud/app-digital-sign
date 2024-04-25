const expenseRepository = require('../repositories/expense.repository');

const getAllExpenses = async () => {
    try {
        return await expenseRepository.getAllExpenses();
    } catch (error) {
        throw new Error('Erro ao buscar as despesas.');
    }
};

const createExpense = async (expenseData) => {
    try {
        return await expenseRepository.createExpense(expenseData);
    } catch (error) {
        throw new Error('Erro ao criar a despesa.');
    }
};

const updateExpense = async (expenseId, updatedExpenseData) => {
    try {
        return await expenseRepository.updateExpense(expenseId, updatedExpenseData);
    } catch (error) {
        throw new Error('Erro ao atualizar a despesa.');
    }
};

const deleteExpense = async (expenseId) => {
    try {
        await expenseRepository.deleteExpense(expenseId);
    } catch (error) {
        throw new Error('Erro ao deletar a despesa.');
    }
};

module.exports = {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense
};
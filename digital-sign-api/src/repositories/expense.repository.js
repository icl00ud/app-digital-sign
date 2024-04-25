const db = require('../config/db.config');

const getAllExpenses = async () => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM TBLExpense');
        return rows;
    } catch (error) {
        throw error;
    }
};

const createExpense = async (expenseData) => {
    try {
        const { description, amount, date } = expenseData;
        const [result] = await db.execute('INSERT INTO TBLExpense (id_user, id_file, description, dt_creation, value, status) VALUES (?, ?, ?, ?, ?, ?)', [description, amount, date]);
        if (result.affectedRows === 1) {
            const [newExpense] = await db.execute('SELECT * FROM TBLExpense WHERE id = ?', [result.insertId]);
            return newExpense;
        } else {
            throw new Error('Erro ao criar a despesa.');
        }
    } catch (error) {
        throw error;
    }
};

const updateExpense = async (expenseId, updatedExpenseData) => {
    try {
        const { description, amount, date } = updatedExpenseData;
        const [result] = await db.execute('UPDATE TBLExpense SET description = ?, amount = ?, date = ? WHERE id = ?', [description, amount, date, expenseId]);
        if (result.affectedRows === 1) {
            const [updatedExpense] = await db.execute('SELECT * FROM TBLExpense WHERE id = ?', [expenseId]);
            return updatedExpense;
        } else {
            throw new Error('Despesa não encontrada ou não pôde ser atualizada.');
        }
    } catch (error) {
        throw error;
    }
};

const deleteExpense = async (expenseId) => {
    try {
        const [result] = await db.execute('DELETE FROM TBLExpense WHERE id = ?', [expenseId]);
        if (result.affectedRows !== 1) {
            throw new Error('Despesa não encontrada ou não pôde ser deletada.');
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense
};
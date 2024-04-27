const db = require('../config/db.config');
const fs = require('fs');

const getAllExpenses = async () => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM TBLExpense');
        return rows;
    } catch (error) {
        throw error;
    }
};

const getAllEmployeeExpensesByUserId = async (userId) => {
    try {
        const [rows, fields] = await db.execute(`
        SELECT
  expense.id,
  expense.id_file,
  expense.id_user,
  expense.description,
  expense.value,
  expense.status,
  manager_user.id as id_manager,
  manager_user.name AS manager
FROM
  TBLExpense expense
  LEFT JOIN TBLUser user ON expense.id_user = user.id
  LEFT JOIN TBLUser manager_user ON user.id_manager = manager_user.id
WHERE
  expense.id_user = ?`, [userId]);
        return rows;
    } catch (error) {
        throw error;
    }
};

const getAllManagerExpensesByUserId = async (userId) => {
    try {
        const [rows, fields] = await db.execute(`
        SELECT
  expense.id,
  expense.id_file,
  user.id_manager,
  expense.description,
  expense.value,
  expense.status,
  user.id as id_user,
  user.name AS user
FROM
  TBLExpense expense
  LEFT JOIN TBLUser user ON expense.id_user = user.id
WHERE
  user.id_manager = ?`, [userId]);
        return rows;
    } catch (error) {
        throw error;
    }
};

const createExpense = async (expenseData, file) => {
    try {
        const fileData = fs.readFileSync(file.path).toString('base64');
        var { descricao, valor, userData } = expenseData;
        const file_extension = file.originalname.split('.').pop();
        const now = new Date();

        valor = valor.replace(',', '.');
        const mimetype = file.mimetype;
        const filename = file.filename;
        const originalname = file.originalname;
        const size = file.size;
        const pendente = 'Pendente';

        const resultTblExpenseReceipts = await db.execute('INSERT INTO TBLExpenseReceipts (mimetype, filename, name, file, file_extension, size) VALUES (?, ?, ?, ?, ?, ?)', [mimetype, filename, originalname, fileData, file_extension, size]);
        const resultTblExpense = await db.execute('INSERT INTO TBLExpense (id_user, id_file, description, dt_creation, value, status) VALUES (?, ?, ?, ?, ?, ?)', [JSON.parse(userData).id, resultTblExpenseReceipts[0].insertId, descricao, now, valor, pendente]);

        fs.unlinkSync(file.path);

        return resultTblExpense;
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

const getExpenseFile = async (id_file) => {
    try {
        const [result] = await db.execute('SELECT file FROM TBLExpenseReceipts WHERE id = ?', [id_file]);
        if (result.length === 0)
            throw new Error('Despesa não encontrada ou não pôde ser assinada.');

        return result[0].file;
    } catch (error) {
        throw error;
    }
};

const getManagerByExpenseId = async (id_file) => {
    try {
        const [rows, fields] = await db.execute(`
        SELECT
  user.id_manager,
  user.name AS name
FROM
    TBLExpense expense
    LEFT JOIN TBLUser user ON expense.id_user = user.id
    WHERE
    expense.id_file = ?`, [id_file]);
        return rows[0];
    }
    catch (error) {
        throw error;
    }
};

module.exports = {
    getAllExpenses,
    getAllEmployeeExpensesByUserId,
    getAllManagerExpensesByUserId,
    createExpense,
    getExpenseFile,
    deleteExpense,
    getManagerByExpenseId
};
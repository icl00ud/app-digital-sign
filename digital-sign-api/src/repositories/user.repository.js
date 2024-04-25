const db = require('../config/db.config');

const getAllUsers = async () => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM TBLUser');
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM TBLUser WHERE id = ?', [id]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const { name, password, email, id_role } = userData;
    const [result] = await db.execute('INSERT INTO TBLUser (id_role, name, password, email) VALUES (?, ?, ?, ?)', [id_role, name, password, email]);
    const newUserId = result.insertId;
    const [newUser] = await db.execute('SELECT * FROM TBLUser WHERE id = ?', [newUserId]);
    return newUser[0];
  } catch (error) {
    throw error;
  }
};

const deleteUserById = async (id) => {
  try {
    const [result] = await db.execute('DELETE FROM TBLUser WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
};
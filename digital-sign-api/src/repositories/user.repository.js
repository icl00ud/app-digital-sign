const db = require('../config/db.config');

const getAllUsers = async () => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM TBLUser');
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUserByEmailAndPassword = async (userData) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM TBLUser WHERE email = ? AND password = ?', [userData.email, userData.password]);
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
    var { name, password, email, role, manager } = userData;
    manager === '' ? manager = null : manager;
    const [result] = await db.execute('INSERT INTO TBLUser (id_role, id_manager, name, password, email) VALUES (?, ?, ?, ?, ?)', [role, manager, name, password, email]);
    const newUserId = result.insertId;
    const [newUser] = await db.execute('SELECT * FROM TBLUser WHERE id = ?', [newUserId]);
    return newUser[0];
  } catch (error) {
    throw error;
  }
};

const getManagers = async () => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM TBLUser WHERE id_role = 2');
    return rows;
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
  getUserByEmailAndPassword,
  createUser,
  deleteUserById,
  getManagers
};
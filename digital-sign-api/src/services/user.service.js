const userRepository = require('../repositories/user.repository');

const getAllUsers = async () => {
    try {
        return await userRepository.getAllUsers();
    } catch (error) {
        throw new Error('Erro ao buscar os usuários.');
    }
};

const getUserById = async (id) => {
    try {
        return await userRepository.getUserById(id);
    } catch (error) {
        throw new Error('Erro ao buscar o usuário.');
    }
};

const createUser = async (userData) => {
    try {
        return await userRepository.createUser(userData);
    } catch (error) {
        throw new Error('Erro ao criar o usuário.');
    }
};

const deleteUserById = async (id) => {
    try {
        return await userRepository.deleteUserById(id);
    } catch (error) {
        throw new Error('Erro ao deletar o usuário.');
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
};
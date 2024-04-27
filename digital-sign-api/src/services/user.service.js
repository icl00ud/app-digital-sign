const userRepository = require('../repositories/user.repository');
const jwt = require('jsonwebtoken');

const getAllUsers = async () => {
    try {
        return await userRepository.getAllUsers();
    } catch (error) {
        throw new Error('Erro ao buscar os usuários.');
    }
};

const createUser = async (userData) => {
    try {
        return await userRepository.createUser(userData);
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao criar o usuário.');
    }
};

const loginUser = async (userData) => {
    try {
        const result = await userRepository.getUserByEmailAndPassword(userData);

        token = jwt.sign({ email: result.email, name: result.name }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });

        roles = ['Funcionário', 'Gerente', 'Diretor']

        const user = {
            id: result.id,
            name: result.name,
            email: result.email,
            role: roles[result.id_role - 1],
            token: token
        }

        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar o usuário.');
    }
};

const getManagers = async () => {
    try {
        return await userRepository.getManagers();
    } catch (error) {
        throw new Error('Erro ao buscar os gerentes.');
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
    createUser,
    loginUser,
    deleteUserById,
    getManagers
};
const userService = require('../services/user.service');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os usuários.' });
    }
};

const createUser = async (req, res) => {
    try {
        await userService.createUser(req.body);
        res.status(201).json(req.body);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o usuário.' });
    }
};

const loginUser = async (req, res) => {
    try {
        const token = await userService.loginUser(req.body);
        if (!token) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o usuário.' });
    }
};

const getManagers = async (req, res) => {
    try {
        const managers = await userService.getManagers();
        res.status(200).json(managers);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os gerentes.' });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const user = await userService.deleteUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o usuário.' });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    deleteUserById,
    getManagers
};
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.get('/managers', userController.getManagers);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
'use strict'
// Importar Express y crear router
const express = require('express');
const router = express.Router();

// Importar constroladores
const UserController = require('../controllers/userController')

// Rutas :D
router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router 
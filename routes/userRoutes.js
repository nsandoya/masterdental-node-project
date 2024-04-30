'use strict'
// Importar Express y crear router
const express = require('express');
const router = express.Router();

// Importar constroladores
const UserController = require('../controllers/userController')

// Rutas :D
router.get('/', UserController.getAllUsers); // Obtener todos los registros
router.get('/:id', UserController.getUserByID); // Obtener registro por ID
router.post('/', UserController.createUser); // Crear nuevo registro
router.put('/:id', UserController.updateUser); // Actualizar registro
router.delete('/:id', UserController.deleteUser); // Borrar registro

module.exports = router 
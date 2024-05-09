'use strict'
// Importar Express y crear router
const express = require('express');
const router = express.Router();
//Redis
const {redisCache, getUsersFromCache} = require('../middlewares/redisCache')

// Importar constroladores
const UserController = require('../controllers/userController')

// Rutas :D     
//Redis intercepta el res y guarda su info. De igual forma es quien responde cuando hacemos nuevamente la misma consulta
//router.get('/', redisCache.route() ,UserController.getAllUsers); // Obtener todos los registros
router.get('/', UserController.getAllUsers); // Obtener todos los registros
router.get('/:id',UserController.getUserByID); // Obtener registro por ID
router.post('/',UserController.createUser); // Crear nuevo registro
router.put('/:id',UserController.updateUser); // Actualizar registro
router.delete('/:id',UserController.deleteUser); // Borrar registro

module.exports = router 
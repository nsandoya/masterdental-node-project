'use strict'
// Importar Express y crear router
const express = require('express');
const router = express.Router();

//Redis
const {redisCache, getUsersFromCache} = require('../middlewares/redisCache')

// Importar constroladores
const userController = require('../controllers/userController')
const sendMailToClient = require('../controllers/mailMarketingController')

// Rutas :D
router.get('/users', redisCache.route(), userController.getAllUsers);
router.get('/send', getUsersFromCache, sendMailToClient);

module.exports = router 

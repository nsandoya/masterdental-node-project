'use strict'
// Importar Express y crear router
const express = require('express');
const router = express.Router();

//Redis
const redisCache = require('../middlewares/redisCache')

// Importar constroladores
const mailMarketingController = require('../controllers/mailMarketingController')

// Rutas :D
router.get('/send'/* , redisCache.route() */,mailMarketingController);

module.exports = router 

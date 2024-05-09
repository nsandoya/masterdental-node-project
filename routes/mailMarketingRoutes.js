'use strict'
// Importar Express y crear router
const express = require('express');
const router = express.Router();

//Redis
const {redisCache, getUsersFromCache} = require('../middlewares/redisCache')

// Importar constroladores
const sendMailMarketing = require('../controllers/mailMarketingController')

// Rutas :D
router.get('/send', getUsersFromCache, sendMailMarketing);

module.exports = router 

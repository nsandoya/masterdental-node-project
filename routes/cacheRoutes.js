'use strict'
// Importar Express y crear router
const express = require('express');
const router = express.Router();
// Importar Redis
const expressRedisCache = require('express-redis-cache');


const cache = expressRedisCache({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	auth_pass: process.env.REDIS_PASSWORD,
    expire: 12000 //milisegundos //tiempo que permanece guardada la info
})

router.get('/cache', cache.route() , cacheController)

module.exports = router
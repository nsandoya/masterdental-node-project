'use strict'
// Importar Express y crear router
const express = require('express');
const router = express.Router();
// Importar Redis
const expressRedisCache = require('express-redis-cache');


const cache = expressRedisCache({
	host: 'redis-17047.c240.us-east-1-3.ec2.redns.redis-cloud.com',
	port: 17047,
	auth_pass: 'NXrPNSGTmsib9Ro81tnMQJzpqvOoNWX1',
    expire: 12000 //milisegundos //tiempo que permanece guardada la info
})

//router.get('/cache', cache.route() , cacheController)

//module.exports = router
module.exports = cache
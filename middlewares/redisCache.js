'use strict'
// Importar Express y crear router
const express = require('express');
// Importar Redis
const expressRedisCache = require('express-redis-cache');


const redisCache = expressRedisCache({
	host: 'redis-17047.c240.us-east-1-3.ec2.redns.redis-cloud.com',
	port: 17047,
	auth_pass: 'NXrPNSGTmsib9Ro81tnMQJzpqvOoNWX1',
    expire: 120000 //milisegundos //tiempo que permanece guardada la info
})

function getUsersFromCache(req, res, next){
	redisCache.get('/', function (error, entries) {
		if (error) {
		  console.error(error);
		  return next(error);
		}
	
		if (entries.length > 0) {
			console.log(entries)
		  	
			return req.users = JSON.parse(entries[0].body);
		}
	
		next();
	  });
}

//router.get('/cache', cache.route() , cacheController)

//module.exports = router
module.exports = {redisCache, getUsersFromCache}
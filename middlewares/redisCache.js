'use strict'
// Importar Express y crear router
const express = require('express');
// Importar Redis
const redis = require('redis')
const expressRedisCache = require('express-redis-cache');


const redisCache = expressRedisCache({
	host: 'redis-17047.c240.us-east-1-3.ec2.redns.redis-cloud.com',
	port: 17047,
	auth_pass: 'NXrPNSGTmsib9Ro81tnMQJzpqvOoNWX1',
    expire: 120000 //milisegundos //tiempo que permanece guardada la info
})


//const redisClient = redis.createClient({url: "redis//localhost:6379"})
redisCache.on("error", ()=>console.log("conectado a redis server"))
redisCache.on("error", err=>console.log("error en el cliente redis", err))

function getUsersFromCache(req, res, next){
	console.log("Pasa por getUsersFromCache")
	redisCache.get(function (error, entries) {
		if ( error ) throw error;
	   
		entries.forEach(console.log.bind(console));
	  });
	next()
	//redisCache.get('/api/users/')
	/* , function (error, entries) {
		 if (error) {
		  console.error(error);
		  return next(error);
		}
	
		if (entries.length > 0) {
			console.log(entries)
			return req.users = JSON.parse(entries[0].body);
		}
		next(); 
	  } */
	  /* .then((data)=>{
		if(data){
			console.log("Habemus datos en cache");
			return res.status(200).json({data: JSON.parse(data)})
		}
	  })
	  .catch((error)=>{
		console.log("No hay :(")
		return res.status(400).json({status:400, error: error})

	  }

	  ); */
}

//router.get('/cache', cache.route() , cacheController)

//module.exports = router
module.exports = {redisCache, getUsersFromCache}
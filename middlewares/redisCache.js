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
    expire: 600000 //milisegundos //tiempo que permanece guardada la info
})


//const redisClient = redis.createClient({url: "redis//localhost:6379"})
redisCache.on("connected", ()=>console.log("conectado a redis server"))
redisCache.on("error", err=>console.log("error en el cliente redis", err))

async function getUsersFromCache(req, res, next){
	console.log("Pasando por getUsersFromCache")
	await new Promise((resolve, reject) => {
		redisCache.get((error, entries) => {
			if (error) {
				console.error(error);
				return reject(error);
			  }

			let redisEntries
			entries.forEach((entrie)=>{ // c/entry es un conjunto de todos los registros que se guardaron al hacer uso, en su momento, al cachearlos desde users (acá solo hay 1 entrie)
				//console.log.bind(console)
				redisEntries = JSON.parse(entrie.body)
			});
			console.log("por enviar users")
			return resolve(req.users = redisEntries)
			//return req.users = redisEntries
			/* for(let entrie of redisEntries){ //Acá si puedo iterar en los registros del entrie
				console.log("entrie,", entrie)
			} */

		});

	});
	next()

}

module.exports = {redisCache, getUsersFromCache}
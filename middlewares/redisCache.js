'use strict'
// Importar Express y crear router
const express = require('express');
// Importar Redis
const redis = require('redis')
const mongoose = require('mongoose');
const User = require('../models/user');
const expressRedisCache = require('express-redis-cache');


const redisCache = expressRedisCache({
	host: 'redis-17047.c240.us-east-1-3.ec2.redns.redis-cloud.com',
	port: 17047,
	auth_pass: 'NXrPNSGTmsib9Ro81tnMQJzpqvOoNWX1',
    expire: 600000 //milisegundos //tiempo que permanece guardada la info
})

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

			if(!req.users){
				/* return res.status(404).send({status: 404, message:"Tu registro en caché está vacío. Por favor, entra a /api/mail-marketing-users primero para solucionarlo :)"}) */
				User.find()
					.then(users => {
						// Guarda los usuarios en Redis
						redisCache.add('users', 6000, JSON.stringify(users), function (error, added) {
							if (error) throw error;
							console.log(added); // true
						});
						return resolve(req.users = users)
					})
					.catch(err => {
						console.error(err);
						return res.status(404).send({status: 404, message:"Tu registro está vacío. Por favor, entra a /api/mail-marketing-users primero para solucionarlo :)"})
					})
				}else if(entries && entries.length > 0){
					let redisEntries
					entries.forEach((entrie)=>{ // c/entry es un conjunto de todos los registros que se guardaron al hacer uso, en su momento, al cachearlos desde users (acá solo hay 1 entrie)
						//console.log.bind(console)
						redisEntries = JSON.parse(entrie.body)
					});
					console.log("por enviar users")
					return resolve(req.users = redisEntries)
					//return req.users = redisEntries
	
				}
		});
	})
	next()

}

module.exports = {redisCache, getUsersFromCache}
'use strict'

require('dotenv').config()
const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization
        //req.headers['x-master_dental-access-token']
    
        if(!token){
            reject({
                status: 401,
                message: "No has iniciado sesión"
            })
            /* return res.status(401).send({
                status: 401,
                message: "Invalid data"
            }) */
        }
    
        const KEY = process.env.KEY;
        //console.log("private key",KEY)
        jwt.verify(token, KEY, (err, decodedToken) => {
            if(err){
                console.log("El error es...", err)
                return res.status(401).send({
                    status: 401,
                    message: "Sin autorización para ingresar"
                })
            }else{
                req.userId = decodedToken.userId; // Esto nos ayudará a conocer quién ha iniciado sesión
                req.name = decodedToken.name
                req.decodedToken = decodedToken;
                resolve(
                    res.status(200).send({
                        status: 200,
                        usuario: req.body
                    })
                )
                
            }
        })
    })
    // Revisar esta parte con lo que tiene Santi
    .then(() => next()) // continúa al signt bloque (en este caso, el signt controller)
    .catch( err => res.status(err.status || 500).send({
        message: err.message
    }))

}

module.exports = verifyToken


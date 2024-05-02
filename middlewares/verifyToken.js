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
        }
    
        const KEY = process.env.KEY;
        //console.log("private key",KEY)
        jwt.verify(token, KEY, (err, decodedToken) => {
            if(err){
                //console.log("El error es...", err)
                res.status(401).send({
                    status: 401,
                    message: "Sin autorización para ingresar"
                })
            }else{
                req.userId = decodedToken.userId; // Esta insersión en el request nos ayudará a conocer (en sessionController) quién ha iniciado sesión
                resolve(res)/* (
                    res.status(200).send({
                        status: 200,
                        usuario: req.body
                    })
                ) */
                
            }
        })
    })
    .then(() => next()) // continúa al signt bloque (en este caso, el  controller)
    .catch( err => res.status(err.status || 500).send({
        //message: err.message
        message: "Error de servidor"
    }))

}

module.exports = verifyToken


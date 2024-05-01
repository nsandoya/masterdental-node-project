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
                message: "Sin autorización para ingresar"
            })
            /* return res.status(401).send({
                status: 401,
                message: "Invalid data"
            }) */
        }
    
        jwt.verify(token, process.env.KEY, (err, decodedToken) => {
            if(err){
                return res.status(401).send({
                    status: 401,
                    message: "Sin autorización para ingresar"
                })
            }else{
                req.userId = decodedToken.userId; // Esto nos ayudará a conocer quién ha iniciado sesión
                req.decodedToken = decodedToken;
                resolve()
            }
        })
        .then(() => next()) // continúa al signt bloque (en este caso, el signt controller)
        .catch( err => res.status(err.status || 500).send({
            message: error.message
        }))
    })

}


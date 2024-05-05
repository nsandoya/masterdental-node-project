'use strict'

require('dotenv').config()
const jwt = require('jsonwebtoken')
const authToken = require('../models/authToken')

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
    
        // FALTA VERIFICAR SI EL TOKEN EXISTE EN LA BBDD O:
        authToken.findOne({token:token})
        .then((session) => {
            const KEY = process.env.KEY;
        //console.log("private key",KEY)
            jwt.verify(session.token, KEY, (err, decodedToken) => {
                if(err){
                    //console.log("El error es...", err)
                    res.status(401).send({
                        status: 401,
                        message: "Sin autorización para ingresar || Tu sesión ha caducado"
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
        .catch((err) => {
            //console.log("Has cerrado sesión previamente. Vuelve a ingresar")
            res.status(401).send({
                status: 401,
                message: "Has cerrado sesión previamente. Vuelve a ingresar"
            })
        })

        
        
    })
    .then(() => next()) // continúa al signt bloque (en este caso, el  controller)
    .catch( err => res.status(err.status || 500).send({
        //message: err.message
        message: "Error de servidor"
    }))

}

module.exports = verifyToken


const { validationResult } = require('express-validator');
const User = require('../models/user');

const {mailMarketingQueue} = require('../workers/mailMarketingJob')
// controller
function sendMailMarketing(req, res){
    // validación
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({
            status: 400,
            message: errors.array()
        })
    }
	// extraer desde el req la info a encolar
    /* var data = req.body
    mailMarketingQueue.add(data) */
    return res.status(200).send({
		status: 200,
		message: "El job fue recibido"
    })
}

/* function mailMarketingController(req, res){
	// extraer desde el req la info a encolar
	mailMarketingConfig.add() // e insertarla aquí
	return res.status(200).send({
		status: 200,
		message: "el job fue recibido"
    })
} */
module.exports = sendMailMarketing // controller
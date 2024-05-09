const { validationResult } = require('express-validator');
//const User = require('../models/user');

const {mailMarketingQueue, queues} = require('../workers/queues')
// controller

async function sendMailMarketing(req, res){
    for (let user of req.users) {
        console.log("Mail Marketing Controller", user)
        
        const email = user.email;
        const job = mailMarketingQueue.add({
          email: email
        });
        await job.then(() => console.log(`🚀 Mensaje a ${email} en proceso`))
        .catch(err => console.error(err));
    }
    return res.status(200).send({
        status: 200,
        message: "El job fue recibido"
    })
}

function mailMarketingController(req, res){
	// extraer desde el req la info a encolar
    console.log(req.users, "req users")
	//mailMarketingQueue.add(req.users) // e insertarla aquí
	return res.status(200).send({
		status: 200,
		message: "el job fue recibido"
    })
}
module.exports = sendMailMarketing // controller





// extraer desde el req la info a encolar
    /* var data = req.body
    mailMarketingQueue.add(data) */
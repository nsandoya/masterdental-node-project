// importar la configuración de colas
const mailMarketingConfig = require('../workers/queues')

// controller
function mailMarketingController(req, res){
	// extraer desde el req la info a encolar
	mailMarketingConfig.add() // e insertarla aquí
	return res.status(200).send({
		status: 200,
		message: "el job fue recibido"
    })
}
module.exports = mailMarketingController // controller
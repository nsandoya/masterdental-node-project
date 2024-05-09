//  Aquí se consumen/compilan todos los jobs disponibles. De esta forma, podremos llamar un solo módulo (este) para hacer uso de los jobs en el futuro, en vez de llamar a muchos individualmente
// Por alguna razón esto no funciona. No está implementado :()
const sendMailToClient = require('./mailMarketingJob')
// otro job; otro job...
module.exports = {
	sendMailToClient //otro job, otro job
}

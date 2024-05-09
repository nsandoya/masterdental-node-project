// Creación y configuración de Queues (instancias de Bull, colas)
// Las colas se guardarán en Redis
const Queue = require('bull');
const sendMailToClient= require('./mailMarketingJob')
const {redisCache, getUsersFromCache} = require('../middlewares/redisCache')

let redisConfig = {
    host: 'redis-17047.c240.us-east-1-3.ec2.redns.redis-cloud.com',
	port: 17047,
	password: 'NXrPNSGTmsib9Ro81tnMQJzpqvOoNWX1',
    
}

/* let redis = {
    host: 'redis-17047.c240.us-east-1-3.ec2.redns.redis-cloud.com',
	port: 17047,
    password: 'NXrPNSGTmsib9Ro81tnMQJzpqvOoNWX1',
} */

// Este es un constructor. Crea una nueva Queue en Redis, con estos argumentos
                            // queue instance name     |   opciones
const mailMarketingQueue = new Queue('mailMarketingQueue', {redis: redisConfig});
// Nuestra nueva Queue va a ejecutar este proceso:
mailMarketingQueue.process(2, (job, done) => sendMailToClient(job, done)) // Concurrencia (el 1) (cuántos jobs se procesan por c/vez?)
// En todo caso, esta línea se ejecutará c/vez que un proceso/job se agregue en cola

const queues = [
	{
        name: 'mailMarketingQueue', // Nombre de la instancia madre!
	    hostId: 'Mail marketing redis server',
	    redis: redisConfig
    },
]

module.exports = {mailMarketingQueue, queues}

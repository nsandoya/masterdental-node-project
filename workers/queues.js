// Creación y configuración de Queues (instancias de Bull, colas)
// Las colas se guardarán en Redis
const Queue = require('bull');
const mailMarketingJob = require('./workers')


let redis = {
    host: 'redis-17047.c240.us-east-1-3.ec2.redns.redis-cloud.com',
	port: 17047,
    password: 'NXrPNSGTmsib9Ro81tnMQJzpqvOoNWX1',
}

// Este es un constructor. Crea una nueva Queue en Redis, con estos argumentos
                            // queue instance name     |   opciones
const mailMarketingQueue = new Queue('mailMarketingJob', {redis});
// Nuestra nueva Queue va a ejecutar este proceso:
mailMarketingQueue.process(1, (job, done) => mailMarketingJob(job, done)) // Concurrencia (el 1) (cuántos jobs se procesan por c/vez?)
// En todo caso, esta línea se ejecutará c/vez que un proceso/job se agregue en cola

const queues = [
	{
        name: 'mailMarketingJob', // Nombre de la instancia madre!
	    hostId: 'Mail marketing (:v) redis server',
	    redis
    },
]

module.exports = {mailMarketingQueue, queues}

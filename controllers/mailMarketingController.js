const { validationResult } = require('express-validator');
const User = require('../models/user');

const {mailMarketingQueue, queues} = require('../workers/queues')
// controller
async function sendMailMarketing(req, res){
    // Crear un array para almacenar todas las promesas
    //let jobs = [];

    /* for (let user of req.users) {
        console.log("Mail Marketing Controller", user)
        
        const email = user.email;
        // Añadir el trabajo a la cola y almacenar la promesa en el array
        const job = mailMarketingQueue.add({ email: email });
        jobs.push(job);
        console.log("promesa añadida a array")
    }

    // Esperar a que todas las promesas se resuelvan
    await Promise.all(jobs)
        .then(() => {
            console.log(`Todos los trabajos han sido creados correctamente.`)
            return res.status(200).send({
                status: 200,
                message: "El job fue recibido"
            });
        })
        .catch(err => console.error(err)); */

    
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
    /* if(!errors.isEmpty()){
        return res.status(400).send({
            status: 400,
            message: errors.array()
        })
    } */
    /* res.status(200).send({
        status: 200,
        message: "El job fue recibido"
    }) */
    // validación
    //const errors = validationResult(req)
    
    // Crear un trabajo para cada correo
	/* req.users.forEach(user => {
        console.log("Mail Marketing Controller", user)
        
        const email = user.email;
        const job = mailMarketingQueue.add({
          email: email
        });
        job.then(() => console.log(`Job creado para ${email}`))
           .catch(err => console.error(err));
      
      });
      return res.status(200).send({
        status: 200,
        message: "el job fue recibido"
    }) */
    // Extraer la info del caché (? jaja)
    /* let data = req.users
    mailMarketingQueue.add(data) */
    /* .then(
        res.status(200).send({
            status: 200,
            message: "El job fue recibido"
        })

    ).catch(
        res.status(500).send({
            status: 500,
            message: "Error en cola"
        })
    ) */
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
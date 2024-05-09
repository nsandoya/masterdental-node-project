// Lógica de c/mini proceso y ejecución en cola

// La conclusión de cada uno de sus procesos más pequeños está siendo tratada de forma asíncrona, y será ejecutada como tal por Bull en una queue.
// Una vez termines un job, ejecuta el signt
const sendMailToClient = async (job, done) => {
    try{
        job.progress(10)
        const { email } = job.data;
        console.log(`Enviando mail a ${email}`);

        // Simular el envío de un correo
		job.progress(50)
        console.log(`Mail en camino a ${email}`);
        await new Promise(resolve => setTimeout(resolve, 1000));

		job.progress(100)
        console.log(`Email enviado a ${email}`);
        return done(null, {"message":"Job ejecutado correctamente"})
        /* req.users.forEach(user => {
            job.progress(10)
            console.log("Job iniciado")
            
            const email = user.email;
            console.log(`Job created for email ${email}`)
            job.progress(50)

		    job.progress(100)
		    return done(null, {"data": job.data,"message":"Job ejecutado correctamente"})
          
          }); */

    } catch(error){
        return done(error) // en caso de error, podremos comunicar los estados de ejecución de los jobs
    }
} 

const pruebaJob = async (job, done) => {
    try{
        // Nosotros podemos ir indicando el avance del proceso
		// Procurar generar un proceso para borrar de redis los jobs que ya fueron completados (pero antes, generar logs de estos procesos y guardarlos en otro lado)
        // 1
        job.progress(10)
        console.log("Job iniciado")
        // 2
        
        /* User.find()
        .then(
            //users => res.status(200).json(users)
            (users) => {
                for (let user of users){
                    let email = job.data.email;
                    console.log(`Mail enviado a ${email}`)
                }
            }
        )
        .catch(err => {
            console.error(err);
            res.status(404).send({status: 404, message:"Tu registro está vacío"})
        })  */
        job.progress(50)
        // 3
		job.progress(100)
		return done(null, {"data": job.data,"message":"Job ejecutado correctamente"})
    } catch(error){
        return done(error) // en caso de error, podremos comunicar los estados de ejecución de los jobs
    }
}

module.exports = sendMailToClient


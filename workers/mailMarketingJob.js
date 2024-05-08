// Lógica de c/mini proceso y ejecución en cola

// La conclusión de cada uno de sus procesos más pequeños está siendo tratada de forma asíncrona, y será ejecutada como tal por Bull en una queue.
// Una vez termines un job, ejecuta el signt

module.exports = async (job, done) => {
    try{
        // Nosotros podemos ir indicando el avance del proceso
		// Procurar generar un proceso para borrar de redis los jobs que ya fueron completados (pero antes, generar logs de estos procesos y guardarlos en otro lado)
		job.progress(10)
		console.log("Job iniciado")

		job.progress(100)
		return done(null, {"message":"Job ejecutado correctamente"})
    } catch(error){
        return done(error) // en caso de error, podremos comunicar los estados de ejecución de los jobs
    }
}


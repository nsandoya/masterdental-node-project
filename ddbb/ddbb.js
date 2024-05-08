const mongoose = require('mongoose');

// Conexión a la ddbb
function connectDB(){
    return new Promise((res, rej) => {
        mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            //console.log("Conectado a tipti-project(master_dental)");
            console.log("Successful ddbb conexion");
            res()
        })
        .catch((error) => {
            console.error("Error al conectar a tipti-project(master_dental)");
            rej(error)
        })
    })
}

module.exports = connectDB;
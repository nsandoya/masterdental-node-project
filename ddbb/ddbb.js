const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://natsandoya:i3GXhg8peY73TE5O@tipti-project.ry83rtv.mongodb.net/master_dental'

// Conexión a la ddbb
function connectDB(){
    return new Promise((res, rej) => {
        mongoose.connect(mongoURL)
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
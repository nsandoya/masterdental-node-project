const mongoose = require('mongoose');
const bcryptService = require('../services/bcryptService')
// Crear schema de usuario a través del constructor de mongoose
const userSchema =  new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // este dato debe ser único
    },
    password: {
        type: String,
        required: true,
    },
    consultas: {
        type: Array
    }
});

// .pre es un preSaveMiddleware de Mongo
// Dentro de él podremos implementar el servicio de bcrypt antes creado para hashear el pssword antes de guardar el nuevo usuario :D
userSchema.pre("save", function(next){
    if(!this.isModified("password")){
        return next()
    }
    bcryptService.hashPassword(this.password)
    .then(hashedPassword => {
        this.password = hashedPassword;
        next()
    })
    .catch( (error) => {
        console.error(error)
        next(error)
    })
})

// User model
//                    Collección (Mongo) | Schema
module.exports= mongoose.model("usuarios", userSchema)


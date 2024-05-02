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
    pssword: {
        type: String,
        required: true,
    },
});

// .pre es un preSaveMiddleware de Mongo
// Dentro de él podremos implementar el servicio de bcrypt antes creado para hashear el pssword antes de guardar el nuevo usuario :D
userSchema.pre("save", function(next){
    if(!this.isModified("pssword")){
        return next()
    }
    bcryptService.hashPassword(this.pssword)
    .then(hashedPassword => {
        this.pssword = hashedPassword;
        next()
    })
    .catch( (error) => {
        console.error(error)
        next(error)
    })
})

// No funciona :c
/* userSchema.pre("findByIdAndUpdate",function(next) {
    console.log(this._update.pssword);
    if (!this._update.pssword) {
        return next();
    }

    bcryptService.hashPassword(this._update.pssword)
    .then(hashedPassword => {
        console.log(hashedPassword)
        this._update.pssword = hashedPassword;
        next()
    })
    .catch( (error) => {
        console.error(error)
        next(error)
    })
    
  }); */

    
    /* const update = this.getUpdate();
        if (!update.$set || !update.$set.pssword) {
            console.log("no encontró nada")
            return next();
        }
        try {
            const hashedPassword = bcryptService.hashPassword(update.$set.pssword);
            this.getUpdate().$set.pssword = hashedPassword;
            next();
        } catch (error) {
            next(error);
        } */
        

    /* var newPssword = this.getUpdate().pssword; 
    console.log("Update: ", newPssword)
    if (!newPssword) {
        return next();
    }

    bcryptService.hashPassword(newPssword)
    .then(hashedPassword => {
        this.updateOne({pssword:hashedPassword},  
        { $set: { pssword:hashedPassword } })
        next()
    })
    .catch( (error) => {
        console.error(error)
        next(error)
    })  */
    /* try {
        const hashedPassword = bcryptService.hashPassword(password);
        this.getUpdate().$set.pssword = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }*/


// User model
//                    Collección (Mongo) | Schema
module.exports= mongoose.model("usuarios", userSchema)


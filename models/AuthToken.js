const mongoose = require('mongoose');
const User = require('./user');


const authTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", // Si hay problemas al implementarlo, cambiarle a minúscula, o cambiarle a "usuarios"
        required: true
    },
    nombre: {
        type: String
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "3m"
    }
});

/* authTokenSchema.pre("save", function(next){
    if(!this.isModified("name")){
        return next()
    }

    User.findById(this.userId)
    .then( (user) => {
        this.nombre = user.nombre
        next()
    })
    .catch( (error) => {
        console.error(error)
        next(error)
    })
}) */

module.exports = mongoose.model("authtoken", authTokenSchema)

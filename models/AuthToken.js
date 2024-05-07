const mongoose = require('mongoose');
const User = require('./user');


const authTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", // Si hay problemas al implementarlo, cambiarle a minúscula, o cambiarle a "usuarios"
        required: true
    },
    user: {
        type: String
    },
    email:{
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //default: () => new Date(),
        //expires: "10m" // El documento expira dentro de 10min, en teoría...
    },
    expirationDate:{
        type: Date,
        required: true,
    }
});



module.exports = mongoose.model("authtoken", authTokenSchema)

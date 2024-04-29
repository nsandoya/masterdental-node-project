const mongoose = require('mongoose');
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
        required: true
    },
});
// User model
const User = mongoose.model("User", userSchema)

module.exports = User
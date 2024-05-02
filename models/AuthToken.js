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



module.exports = mongoose.model("authtoken", authTokenSchema)

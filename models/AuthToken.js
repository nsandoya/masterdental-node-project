const mongoose = require('mongoose');

const authTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Si hay problemas al implementarlo, cambiarle a minúscula, o cambiarle a "usuarios"
        required: true
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

const AuthToken = mongoose.model("authtoken", authTokenSchema)

module.exports = AuthToken
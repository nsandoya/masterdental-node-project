const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Si hay problemas al implementarlo, cambiarle a minúscula, o cambiarle a "usuarios"
        required: true
    }
})
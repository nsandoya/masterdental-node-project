const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Rutas: login y logout
// No se usa middleware porque haciendo login es que se genera el token de usuario --necesario para pasar el middleware
// Sin token, no superaremos la verificación del middleware
router.post('/login', authController.login)
router.post('/logout', authController.logout)

module.exports = router
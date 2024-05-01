'use strict'
// Para crear un router
const express = require('express')
const router = express.Router()
// Importar controladores/handlers de peticiones
const sessionController = require('../controllers/sessionController')
// Importar middleware (el cual estará entre la petición y la respuesta)
const verifyToken = require('../middlewares/verifyToken')

// Setear ruta base (protegida)
          //Ruta          | Intervenir petición para verificar si se tienen los permisos para recibir la respuesta que el cliente busca | Handler para la respuesta
router.get('/currentUser', verifyToken, sessionController)

module.exports = router

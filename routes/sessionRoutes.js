'use strict'

const express = require('express')
const router = express.Router()

const sessionController = require('../controllers/sessionController')
const verifyToken = require('../middlewares/verifyToken')

// Setear ruta base (protegida)
router.get('/currentUser', verifyToken, sessionController.getCurrentUser)

module.exports = router

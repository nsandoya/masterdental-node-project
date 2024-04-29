const express = require('express');
const userRoutes = require("./routes/userRoutes");
const connectDB  = require('./ddbb/ddbb');

// Crear instancia de Express
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json())

// Rutas:   base     + endpoints
//app.use('/api/users', userRoutes)

// Conectar con la ddbb
connectDB()

// Inicializar el servidor
var server = app.listen(PORT, ()=>{
    console.log(`App listening in port ${PORT}`)
})
server.timeout = 120000; // Tiempo de espera recomendado

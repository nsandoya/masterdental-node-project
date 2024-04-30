const express = require('express');
const userRoutes = require("./routes/userRoutes");
const connectDB  = require('./ddbb/ddbb');

// Crear instancia de Express
const app = express();
const PORT = 3000;

// Middleware
// Parsea los datos del body a JSON
app.use(express.json())

// Rutas:   base     + endpoints
app.use('/api/users', userRoutes) // No olvidar exportar las rutas desde userRoutes :v

// Conectar con la ddbb
connectDB()

// Inicializar el servidor
app.listen(PORT, ()=>{
    console.log(`App listening in port ${PORT}`)
})
//server.timeout = 120000; // Tiempo de espera recomendado

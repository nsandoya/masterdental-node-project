const Arena = require('bull-arena')
const Bull = require('bull')
// Ya que se exportan varios archivos desde 'queues.js', debemos hacer destructuring al importar (así evitamos usar incorrectamente su contenido)
const {mailMarketingQueue, queues} = require('./workers/queues')

const express = require('express');
const connectDB  = require('./ddbb/ddbb');
const userRoutes = require("./routes/userRoutes");
const authRoutes = require('./routes/authRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const mailMarketingRoutes = require('./routes/mailMarketingRoutes')

const verifyToken = require('./middlewares/verifyToken')
// Crear instancia de Express
const app = express();
const PORT = 3000;

// Middleware
// Parsea los datos del body a JSON
app.use(express.json())

// bull-arena
const arenaConfig = Arena(
    {Bull, queues}, 
    {basePath: '/arena', disableListen: true}
);
app.use('',arenaConfig);

// Rutas:   base     + endpoints
app.use('/api/users', verifyToken,userRoutes) // No olvidar exportar las rutas desde userRoutes, authRoutes y sessionRoutes :v
app.use('/api/auth', authRoutes)
app.use('/api/session', verifyToken,sessionRoutes)
app.use('/api/mail-marketing', mailMarketingRoutes)

// Errores de json (middleware global)
app.use((err, req, res, next) => {
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
        return res.status(400).send({
            status: 400,
            message: err.message,
        })
    }
    next()
})

// Conectar con la ddbb
connectDB()

// Inicializar el servidor
app.listen(PORT, ()=>{
    console.log(`App listening in port ${PORT}`)
})
//server.timeout = 120000; // Tiempo de espera recomendado

module.exports = {arenaConfig, queues}
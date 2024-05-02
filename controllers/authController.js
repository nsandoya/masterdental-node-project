const authService = require('../services/authService');
const AuthToken = require('../models/authToken');
const bcryptService = require('../services/bcryptService')
const User = require('../models/user');

// Autenticación de usuarios, inicio de sesión
function login(req, res){
    const {email, pssword} = req.body;
    User.findOne({email})
    .then(user => {
        if(!user){
            res.status(401).send({
                status: 401,
                message: "Mail o contraseña inválidos"
            })
        }

        // Comparar pssword del request con el de la bbdd, con la diferencia de que este último estará encriptado. Para hacer la comparación, necesitaremos a bcrypt

        /* const match = (pssword === user.pssword)
        if(!match){
            res.status(401).send({
                status: 401,
                message: "Inicio de sesión fallido"
            })
        } */
        
        bcryptService.comparePassword(pssword, user.pssword)
        .then((match) => {
            if(!match){
                res.status(401).send({
                    status: 401,
                    message: "Email o contraseña inválidos"
                })
            }
            // Si las credenciales son correctas, se genera el token de usuario
            const token = authService.generateToken(user);
            res.json({token})

            // Una vez generado el user token, se guarda en la bbdd
            AuthToken.create({userId: user._id, token, nombre: user.nombre})
            .then(() => {
                console.log("User token guardado")
                //res.send({token})
            })
            .catch((error) => {
                console.error(error)
                res.status(500).send({message: "Houston, no se pudo guardar el token de usuario"})
            })
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send({message: "Houston, tenemos problemas con tu inicio de sesión"})
        })
        
    })
    .catch(err => {
        console.error(err)
        res.status(401).send({
            status: 401,
            message: "Mail o contraseña inválidos"
        })
    })
}

// Cerrar sesión (pendiente)
function logout(req, res){
    // 1. Encontrar token
    // 2. Eliminar token

    const token = req.headers.authorization
    AuthToken.findOneAndDelete({token})
    .then(( destroyedToken) => {
        res.status(200).send({
            message: "Has cerrado sesión",
            logoutData: destroyedToken
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message: "Cierre incorrecto"
        })
    })
    
}


module.exports = {
    login, logout
}
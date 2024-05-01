const authService = require('../services/authService');
const User = require('../models/user');

// Autenticación de usuarios, inicio de sesión
function login(req, res){
    const {email, pssword} = req.body;
    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(401).send({
                message: "Mail o contraseña inválidos"
            })
        }

        const match = (pssword === user.pssword)
        if(!match){
            return res.status(401).send({
                message: "Inicio de sesión fallido"
            })
        }
        // Se genera la public key
        const token = authService.generateToken(user);
        res.json({token})
    })
    .catch(err => {
        console.error(err)
        return res.status(401).send({
            message: "Mail o contraseña inválidos"
        })
    })
}

// Cerrar sesión
function logout(){
    localStorage.removeItem("token")
    res.status(200).send({
        message: "Has cerrado sesión"
    })
}

module.exports = {
    login, logout
}
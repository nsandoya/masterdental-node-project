const User = require('../models/user');

// Quién es el usuario activo?
function getCurrentUser(req, res){
    new Promise((resolve, reject)=>{
        const userId = req.userId;
        // Buscar el usuario usando el id proporcionado
        User.findById({_id: userId})
        .then((user) => {
            if(!user){
                reject({
                    status: 404,
                    message: "El usuario no existe"
                })
            }else{
                res.status(200).json(user); // Simplemente así, para evitar que se envíen 2 respuestas a la vez (ganando la respuesta de error, provocando que no se pueda setear el header del response al cliente)
                //resolve(user)
                //return(user)
            }
        })
        .catch(error => reject({
            status: 500,
            message: "Error al tratar de comprobar user identity"
        }
        ))
    })
    .then(user => res.status(200).json(user))
    .catch(error => {
        console.log(error)
        res.status(error.status || 500).send({message: error.message})
    })
}

module.exports = getCurrentUser
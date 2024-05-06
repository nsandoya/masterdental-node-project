const bcrypt = require('bcrypt');

// Hashear contraseña
function hashPassword(originalPassword){
    return new Promise((resolve, reject) => {
        const saltrounds = 10;
            // Pssword original | # de pases de crypt| nueva contraseña
        bcrypt.hash(originalPassword, saltrounds, (error, hashedPassword) => {
            if(error){
                //console.log("El error es...",error)
                PromiseRejectionEvent(new Error("El hasheo de contraseña ha fracasado"))
            }else{
                resolve(hashedPassword)
            }
        })
    })
}

function comparePassword(originalPassword, hashedPassword){
    return new Promise((resolve, reject) => {
        bcrypt.compare(originalPassword, hashedPassword, (error, match) => {
            if(error){
                reject(new Error("Error al comparar contraseña"))
            }else{
                resolve(match)
            }
        })
    })
}

module.exports = {hashPassword, comparePassword}
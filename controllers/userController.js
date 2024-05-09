// Importar model
const User = require('../models/user');
const bcryptService = require('../services/bcryptService')

//const {mailMarketingQueu} = require('../workers/mailMarketingJob')

// GET (todos los registros)
function getAllUsers(req, res){
    User.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
        console.error(err);
        res.status(404).send({status: 404, message:"Tu registro está vacío"})
    })
}
// GET (un registro en particular)
function getUserByID(req, res){
    const userId = req.params.id;

    User.findById(userId)
    .then(user => res.status(200).send({usuario:user}))
    .catch(err => {
        console.error(err);
        res.status(404).send({status: 404, message:"El usuario que buscas no existe"})
    })
}

// POST (crear nuevos registros)
function createUser(req, res){
    /* const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({
            status: 400,
            message: errors.array()
        })
    } */
    // Destructuring de los campos incluidos en req.body (dichos datos se guardan en las constantes aquí creadas, respectivamente)
    const {nombre, edad, email, password, consultas} = req.body;
    // Se recomienda hacerlo de esta forma solo si los campos y las constantes son homónimos
    User.create({ // En este caso, se implementó un middleware en el modelo donde se hace uso del bcrypt service para encriptar el password del nuevo usuario antes de que se guarde como nuevo registro en la bbdd
        nombre, edad, email, password, consultas
    })
    .then((newUser) => res.status(200).json(newUser))
    .catch(err => {
        console.error(err);
        res.status(500).send({status: 500, message:"Error al tratar de crear el nuevo registro"})
    })

    console.log(req.body)

}

// PUT: modificar registros
let updateUser = async(req, res) => {
    // Obtener de los parámetros de ruta (del request) el id de usuario, y usarlo para realizar la operación
    const userId = req.params.id;
    var newUserInfo = req.body;
    
    
                    // ID de registro | Datos para el update | Este parámetro indica que esta operación debe retornar el registro actualizado
    // Si queremos actualizar el password, se ejecuta el hasheado de la nueva contraseña antes de actualizar ese campo. 
    // Se planteó todo el update como asíncrono porque esta operación requiere un tiempo para ejecutarse (y porque findByIdAndUpdate bypassea los middleware). Si no lo hacemos así, se guardará primero la nueva contraseña (tal cual la ingresó el cliente), y luego obtendremos el hash (muy tarde)
    if(newUserInfo.password){
        newUserInfo = await bcryptService.hashPassword(newUserInfo.password)
        .then(hashedPassword => {
            //console.log(hashedPassword)
            newUserInfo.password = hashedPassword;
            //console.log("funciona?", newUserInfo.password);
            return(newUserInfo)
        })
        .catch( (error) => {
            console.error(error)
            return(newUserInfo)
        })
        
    }

    User.findByIdAndUpdate(userId, newUserInfo, {new:true})
    .then((user) => {
        /* const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({
                status: 400,
                message: errors.array()
        })
        } */
        //console.log("dentro del update: psswrd", newUserInfo2, "userid", userId)
        res.status(200).json(user)
    })
    .catch(err => {
        console.error(err);
        res.status(500).send({status: 500, message:"Error al tratar de actualizar el registro"})
    }) 
    /* User.findByIdAndUpdate(userId,newUserInfo, {new: true} ) 
    .then((user) => res.status(200).json(user))
    .catch(err => {
        console.error(err);
        res.status(500).send({status: 500, message:"Error al tratar de actualizar el registro"})
    }) */
    
}   

// DELETE (eliminar registro)
function deleteUser(req, res){
    const userID = req.params.id;
    User.findByIdAndDelete(userID)
    .then(user => res.status(204).send(`El usuario ${userID} fue eliminado. ${user}`))
    .catch(err => {
        console.error(err);
        res.status(500).send({status: 500, message:"Error al tratar de eliminar el registro"})
    })
}


module.exports = {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
} // Estas serán las operaciones a ejecutar cuando el usuario acceda las rutas (configuradas en userRoutes), respectivamente
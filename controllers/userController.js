// Importar model
const User = require('../models/user');

// GET (todos los registros)
function getAllUsers(req, res){
    User.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
        console.error(err);
        res.status(500).send("Error al tratar de obtener todos los registros")
    })
}
function getUserByID(req, res){
    const userId = req.params.id;

    User.findById(userId)
    .then(user => res.status(200).json(user))
    .catch(err => {
        console.error(err);
        res.status(500).send("Error al tratar de obtener el registro")
    })
}

// POST (crear nuevos registros)
function createUser(req, res){
    // Destructuring de los campos incluidos en req.body (dichos datos se guardan en las constantes aquí creadas, respectivamente)
    const {nombre, edad, email, pssword} = req.body;
    console.log(req.body)
    // Se recomienda hacerlo de esta forma solo si los campos y las constantes son homónimos
    User.create({
        nombre, edad, email, pssword
    }).
    then((newUser) => res.status(200).json(newUser))
    .catch(err => {
        console.error(err);
        res.status(500).send("Error al tratar de crear un nuevo registro")
    })
}

// PUT: modificar registros
function updateUser(req, res){
    // Obtener de los parámetros de ruta (del request) el id de usuario, y usarlo para realizar la operación
    const userId = req.params.id;

    const newUserInfo = req.body;
                    // id de registro | datos para el update | Este parámetro indica que esta operación debe retornar el registro actualizado
    User.findByIdAndUpdate(userId,newUserInfo, {new: true}) 
    .then(user => res.status(200).json(user))
    .catch(err => {
        console.error(err);
        res.status(500).send("Error al tratar de crear un nuevo registro")
    })
    
}   

// DELETE (eliminar registro)
function deleteUser(req, res){
    const userID = req.params.id;
    User.findByIdAndDelete(userID)
    .then(user => res.status(204).send(`El usuario ${userID} fue eliminado`))
    .catch(err => {
        console.error(err);
        res.status(500).send("Error al tratar de eliminar el registro")
    })
}

module.exports = {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
} // Estas serán las operaciones a ejecutar cuando el usuario acceda las rutas (configuradas en userRoutes), respectivamente
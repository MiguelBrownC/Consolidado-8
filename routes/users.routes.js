const express = require('express');
const router = express.Router();

const {

    findUserById,
    findAll,
    updateUserById,
    deleteUserById,
} = require('../controllers/user.controller')

router.use(express.json());

const {auth_required} = require('../middlewares/auth.middlewares')

//obtener todos los usuarios, publico
router.get('/api/users', findAll) 
//obtener  un usuario por ID, privada
router.get('/api/users/:id', auth_required, findUserById)
//Actualiza los campos de firstName y lastName de un usuario
//según su id, acceso por medio de token, previamente iniciado
//sesión
router.put('/api/users/:id', auth_required, updateUserById)
//Elimina el usuario según id, acceso por medio de token,previamente iniciado sesión 
router.delete('/api/user/:id', auth_required, deleteUserById )

module.exports = router

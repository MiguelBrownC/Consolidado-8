const express = require('express');
const router = express.Router();


const {
    createBootcamp,
    findById,
    addUserBootcamp,
    findThem,
} = require('../controllers/bootcamp.controller')


router.use(express.json());

const {auth_required} = require('../middlewares/auth.middlewares')

//Crea un bootcamp, acceso por medio de token, previamente iniciado sesión
router.post('/api/bootcamp', auth_required, createBootcamp) 
//obtener  un usuario por ID, privada
router.post('/api/bootcamp/adduser', auth_required, findById)
//Obtiene información de un bootcamp según id, y muestra los usuarios registrados en el bootcamp. Acceso por medio de
//token, previamente iniciado sesión
router.get('/api/bootcamp/:id', auth_required, addUserBootcamp )
//Lista todos los bootcamp, acceso público
router.get('/api/bootcamp', findThem)


module.exports=router;
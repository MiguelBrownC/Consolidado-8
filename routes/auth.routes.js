const express = require('express');
const router = express.Router();

router.use(express.json());

const {auth_required} = require('../middlewares/auth.middlewares')

const {
  login, 
  signup, 
  readToken
} = require('../controllers/auth.controller')


// Inicio de sesión en la API, acceso público
router.post('/login', login)
//Registro de una nuevo usuario, acceso público
router.post('/signup', signup)
// mostrar Token
router.post('/readToken', auth_required , readToken )

module.exports = router


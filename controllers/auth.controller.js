const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/users.model')

// función para login

const login = async (req, res) =>{
    const { email, password} = req.body 
//verificar ususario
    const verifyUser = await User.findOne({ where: {email}})
    if(!verifyUser){
            return res.status(404).json({error: "Usuario no encontrado"})
        }
//verificación password 
    const verifyPassword = await bcrypt.compare(password , verifyUser.password)
    if(!verifyPassword){
        return res.status(404).json({error: "Password no coincide"})
    }
// calculamos si el token es válido un hora de sesión
    const expireTime = Math.floor( new Date() /1000 ) +3600
// crear token 
    const token = jwt.sign({ 
        exp : expireTime,
        data: {
            id: verifyUser.id,
            email: verifyUser.email,
            firstName: verifyUser.firstName,
            lastName: verifyUser.lastName
        }, 
    }, process.env.SECRET_KEY)

    // 4. Le retorno el token al cliente
    res.json(token);
};


///  registro 

const signup = async (req, res) =>{
    const {firstName, lastName, email, password} = req.body

    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({error: 'todos los campos son obligatorios'})
    }

    const verifyUser = await User.findOne({ where: {email}})
    if(verifyUser){
        return res.status(404).json({error: "Este usuario ya existe"})
    }

    try {
        // encriptar contraseña y  rebcibe dos argumentos 
        const passwordEncrypt = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            firstName, 
            lastName, 
            email, 
            password:passwordEncrypt
        });
        res.json(newUser)

        const expireTime = Math.floor( new Date() /1000 ) +3600
        // crear token 
            const token = jwt.sign({ 
                exp : expireTime,
                data: {
                    id: verifyUser.id,
                    email: verifyUser.email,
                    firstName: verifyUser.firstName,
                    lastName: verifyUser.lastName
                }, 
            }, process.env.SECRET_KEY)
        
            // 4. Le retorno el token al cliente
            res.json(token);
        
    }catch (error){
        return res.status(400).jason(error)
    }
}

//leer un token si es enviado se verifica
const readToken = async (req, res)=>{
    const {token} = req.body

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        res.json(decoded)
    }catch(error){
        return res.status(400).json(error)
    }
}

module.exports = {
    login, 
    signup, 
    readToken
}
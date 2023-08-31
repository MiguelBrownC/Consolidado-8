// traigo los modelos desde la asociacón de tablas User y Bootcamp
const { Bootcamp, User } = require('../models/index.js');


//crea y guarda nuevo usuario

const createBootcamp = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json(bootcamp);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// obtener las opciones de bootcamp por id
const findById = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.findByPk(req.params.id, {
            include: User,
        });
        if (bootcamp) {
            res.json(bootcamp);
        } else {
            res.status(404).json({ message: 'Bootcamp no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//agregar un user al bootcamp
const addUserBootcamp = async (req, res) => {
    try {
        const { userId, bootcampId } = req.body;
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        const user = await User.findByPk(userId);
        if (bootcamp && user) {
            await bootcamp.addUser(user);
            res.status(201).json({ message: 'Usuario agregado exitosamente al Bootcamp' });
        } else {
            res.status(404).json({ message: 'Bootcamp o usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//obtener todos los usuarios 

const findThem = async (req, res) => {
    try {
        const bootcamps = await Bootcamp.findAll({
            include: User,
        });
        res.json(bootcamps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBootcamp,
    findById,
    addUserBootcamp,
    findThem,
};
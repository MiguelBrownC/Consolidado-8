const { User , Bootcamp } = require('../models/index.model.js');



const findUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: Bootcamp,
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            include: Bootcamp,
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserById = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    findUserById,
    findAll,
    updateUserById,
    deleteUserById,
};



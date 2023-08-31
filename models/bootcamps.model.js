const { DataTypes } = require('sequelize')
const db = require('../config/sequelize.config')

const Bootcamp = db.define('Bootcamp', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 5,
            max: 10,
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Bootcamp;
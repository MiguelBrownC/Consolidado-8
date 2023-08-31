const db = require('../config/sequelize.config');
const User = require('./users.model');
const Bootcamp = require('./bootcamps.model');

User.belongsToMany(Bootcamp, {through:'UserBootcamp'}) 
Bootcamp.belongsToMany(User, {through:'UserBootcamp'})

try {
    db.sync()
} catch(err) {
    console.log(err);
}

module.exports = { User, Bootcamp };
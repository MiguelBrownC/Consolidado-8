const Sequelize = require('sequelize')



// 1. Creamos la base de datos con
const db = new Sequelize('db_prueba', 'mbrown', '08052018', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
})

// 2. Sincronozamos con la base de datos
async function syncDB () {
  try {
    await db.authenticate()
    console.log('Connections has been established successfully');
  }
  catch(error) {
    console.error('Unable to connect to database', error)
  }
}
syncDB()

module.exports = db
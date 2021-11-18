
const { Sequelize } = require('sequelize');

const mongoDB = process.env.POSTGRESDB_URI || 'postgres://postgres:Qppq1997@localhost:5432/blueFrame'
const sequelize = new Sequelize(mongoDB, { dialect: 'postgres' });

// check connection
sequelize.authenticate().then(
    () => console.log('Connection has been estabished with database'))
    .catch((err) => console.error('unable to connect to the database: ', err))

sequelize.sync()
    .then((result) => console.log(result))
    .catch((err) => console.log(err))

module.exports = sequelize;
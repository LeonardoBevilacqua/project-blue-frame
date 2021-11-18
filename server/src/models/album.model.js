const { Sequelize } = require('sequelize');
const database = require('../db');

const Album = database.define('album', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    album: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    mimetype: {
        type: Sequelize.STRING(15),
        allowNull: true
    },
    filename: {
        type: Sequelize.STRING(255),
        allowNull: true
    }
});


module.exports = Album

const Sequelize = require('sequelize');
const database = require('../db');

const User = database.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sub: {
        type: Sequelize.STRING,
        allowNull: false
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = User;
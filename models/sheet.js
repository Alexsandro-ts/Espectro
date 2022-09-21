const Sequelize = require('sequelize');
const database = require('../db');

const Sheet = database.define('Sheet', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    clan: {
        type: Sequelize.STRING,
        allowNull: false
    },
    origin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    class: {
        type: Sequelize.STRING,
        allowNull: false
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    aspect: {
        type: Sequelize.STRING,
        allowNull: false
    },
    language: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.STRING,
    notes: {
        type: Sequelize.STRING,
        defaultValue: "",
    }
});

module.exports = Sheet;
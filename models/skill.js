const Sequelize = require('sequelize')
const database = require('../db')


const Skill = database.define('Skill', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_sheet: {
        type: Sequelize.STRING,
        allowNull: false
    },
    trained: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    attribute: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bonus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = Skill
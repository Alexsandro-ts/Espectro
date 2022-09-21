const Sequelize = require('sequelize')
const database = require('../db')


const Proficiency = database.define('Proficiency', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    id_sheet: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    armor: Sequelize.STRING,
    weapon: Sequelize.STRING
})

module.exports = Proficiency
const Sequelize = require('sequelize')
const database = require('../db')

const Shield = database.define('Shield', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_sheet: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: Sequelize.STRING,
    shield_def: Sequelize.INTEGER,
    speed_penalty: Sequelize.INTEGER,
    shield_hp: Sequelize.INTEGER,
    hardness: Sequelize.INTEGER,
    broken_thershold: Sequelize.INTEGER,
    volume: Sequelize.INTEGER
})

module.exports = Shield
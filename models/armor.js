const Sequelize = require('sequelize')
const database = require('../db')

const Armor = database.define('Armor', {
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
    armor_def: Sequelize.INTEGER,
    dex_limit: Sequelize.INTEGER,
    test_penalty: Sequelize.INTEGER,
    speed_penalty: Sequelize.INTEGER,
    armor_str: Sequelize.INTEGER,
    volume: Sequelize.INTEGER,
    group: Sequelize.STRING,
    trace: Sequelize.STRING,
})

module.exports = Armor
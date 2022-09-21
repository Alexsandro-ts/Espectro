const Sequelize = require('sequelize')
const database = require('../db')

const Attack = database.define('Attack', {
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
    name: Sequelize.STRING,
    atk_bonus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    damage: Sequelize.STRING,
    dmg_attribute: Sequelize.STRING,
    extra_dmg: Sequelize.INTEGER,
    dmg_type: Sequelize.STRING,
    atk_skill: Sequelize.INTEGER // ID da perícia
})

module.exports = Attack
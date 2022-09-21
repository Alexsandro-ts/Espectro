const Sequelize = require('sequelize')
const database = require('../db')

const Status = database.define('Status', {
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

    max_hp: Sequelize.INTEGER,

    current_hp: Sequelize.INTEGER,

    max_mp: Sequelize.INTEGER,

    current_mp: Sequelize.INTEGER,

    size: Sequelize.STRING,

    reach: Sequelize.FLOAT,

    land_speed: Sequelize.FLOAT,

    excavate_speed: Sequelize.FLOAT,

    swim_speed: Sequelize.FLOAT,

    fly_strength: Sequelize.FLOAT,

    class_cd: Sequelize.INTEGER,

    overload: Sequelize.INTEGER,

    perception: Sequelize.INTEGER,

    defense: {
        type: Sequelize.INTEGER,
        defaultValue: "10"
    },

    defense_bonus: Sequelize.INTEGER,

    defense_penalty: Sequelize.INTEGER,

    str: Sequelize.INTEGER,

    dex: Sequelize.INTEGER,

    con: Sequelize.INTEGER,

    int: Sequelize.INTEGER,

    wis: Sequelize.INTEGER,

    cha: Sequelize.INTEGER,

    fortitude: Sequelize.INTEGER,

    reflex: Sequelize.INTEGER,

    will: Sequelize.INTEGER
})

module.exports = Status
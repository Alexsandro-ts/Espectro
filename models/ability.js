const Sequelize = require('sequelie')
const database = require('../db')

const Ability = database.define('Ability', {
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
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    trace: {
        type: Sequelize.STRING,
        allowNull: false
    },
    coust: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    source: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },

})

module.exports = Ability
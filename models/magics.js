const Sequelize = require('sequelie')
const database = require('../db')

const Magics = database.define('Magics', {
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
    circle: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tradition: {
        type: Sequelize.STRING,
        allowNull: false
    },
    school: {
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
    cd: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    execution: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reach: {
        type: Sequelize.STRING,
        allowNull: false
    },
    target_area: {
        type: Sequelize.STRING,
        allowNull: false
    },
    duration: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resistence: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = Magics
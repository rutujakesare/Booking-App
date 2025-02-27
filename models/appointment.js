const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false
    }
}, {
    tableName: 'appointments',
    timestamps: false,
    freezeTableName: true
});

module.exports = { Appointment }; // Ensure it's an object

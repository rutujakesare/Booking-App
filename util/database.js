const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('appointment_db', 'root', 'rutuja@38', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;

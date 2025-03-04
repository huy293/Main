const { Sequelize } = require('sequelize');
require('dotenv').config();

//connection DB
const sequelize = new Sequelize("MTKCK", "root", "123456", {
    host: 'localhost',
    port: '3307',
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});
let connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connection;
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});
// console.log("sqqqqqqq", sequelize)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.book = require('./book')(sequelize, DataTypes);

module.exports = db;

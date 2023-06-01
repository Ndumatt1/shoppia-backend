/**
 * Establishes a connection to the MYSQL database using Sequelize
 *
 * @returns {object} The sequelize instancee representing the database connection.
 */
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const password = process.env.MYSQLPASSWORD;
const db = process.env.MYSQLDATABASE;
const user = process.env.MYSQLUSER;
const host = process.env.MYSQLHOST;

const sequelize = new Sequelize(db, user, password, {
  host: host,
  port: process.env.MYSQLPORT,
  dialect: 'mysql',
  dialectModule: mysql,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;

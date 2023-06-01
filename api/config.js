/**
 * Establishes a connection to the MYSQL database using Sequelize
 *
 * @returns {object} The sequelize instancee representing the database connection.
 */
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const password = process.env.DB_PASSWORD;
const db = process.env.DB;
const user = process.env.USER || 'root';
const host = process.env.HOST || '127.0.0.1';

const sequelize = new Sequelize(db, user, password, {
  host: host,
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


const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306, // Default MySQL port is 3306
  dialectOptions: {
    connectTimeout: 20000, // Set a higher value if needed (in milliseconds)
  },
  pool: {
    min: 0,
    max: 10,
  },
  define: {
    charset: 'utf8',
    timestamps: false,
  },
  benchmark: false,
  logging: false,
});

module.exports = sequelize;

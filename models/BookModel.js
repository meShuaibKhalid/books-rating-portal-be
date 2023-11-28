const sequelize = require("../configurations/config");
const Sequelize = require("sequelize");

const Book = sequelize.define(
  "Book",
  {
    image: { type: Sequelize.STRING, allowNull: false },
    abstract: { type: Sequelize.STRING, allowNull: false },
    author: { type: Sequelize.STRING, allowNull: false },
    title: { type: Sequelize.STRING, allowNull: false },
    publish_date: { type: Sequelize.STRING },
    category: { type: Sequelize.STRING, allowNull: false },
    rating: { type: Sequelize.FLOAT, allowNull: true } 
  },
  { freezeTableName: true }
);

module.exports = Book;

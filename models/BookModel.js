const sequelize = require("../configurations/config");
const Sequelize = require("sequelize");

const Book = sequelize.define(
  "Book",
  {
    image: { type: Sequelize.STRING(10000), allowNull: true },
    abstract: { type: Sequelize.STRING, allowNull: false },
    author: { type: Sequelize.STRING, allowNull: false },
    title: { type: Sequelize.STRING, allowNull: false },
    publish_date: { type: Sequelize.STRING },
    rating: { type: Sequelize.FLOAT, allowNull: true },
    location: { type: Sequelize.STRING, allowNull: true },
    isLocationBestSeller: { type: Sequelize.BOOLEAN, defaultValue: false },
    addedBy: { type: Sequelize.INTEGER, allowNull: false }
  },
  { freezeTableName: true }
);

module.exports = Book;

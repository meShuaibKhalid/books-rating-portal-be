const sequelize = require("../configurations/config");
const Sequelize = require("sequelize");

const Review = sequelize.define(
  "Review",
  {
    title: { type: Sequelize.STRING, allowNull: false },
    book_id: { type: Sequelize.STRING, allowNull: false }
  },
  { freezeTableName: true }
);

module.exports = Review;

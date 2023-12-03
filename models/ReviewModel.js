const sequelize = require("../configurations/config");
const Sequelize = require("sequelize");

const Review = sequelize.define(
  "Review",
  {
    title: { type: Sequelize.STRING, allowNull: false },
    book_id: {type: Sequelize.INTEGER, allowNull: false},
    book_name: {type: Sequelize.STRING, allowNull: false},
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    rating: { type: Sequelize.INTEGER, allowNull: false }
  },
  { freezeTableName: true }
);

module.exports = Review;

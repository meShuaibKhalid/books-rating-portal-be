const User = require("../models/userModel");
const Review = require('../models/ReviewModel');
const Book = require('../models/BookModel');
const router = require('express').Router();

router.post("/addreview", async (req, res) => {
    try {
        const { title, book_id, book_name, user_name, user_id, rating } = req.body;
        const review = await Review.create({
            title,
            book_id,
            book_name,
            user_name,
            user_id,
            rating
        });
        res.status(201).json(review);
    } catch (error) {
        // Handle errors and respond with an error message
        res.status(500).json({ error: error.message });
    }
});

//this will take book id and get reviews against that book.....
router.get("/:id", async (req, res) => {
    try {
        const book_review = await Review.findAll({
            where: { book_id: parseInt(req.params.id, 10) }
        })
        // Check if the reviews against book
        if (book_review.length > 0) {
            // Respond with the reviews if found
            res.status(200).json(book_review);
        } else {
            // Respond with a 404 status if the review is not found
            res.status(404).json({ error: "no review found" });
        }
    } catch (error) {
        // Handle errors and respond with an error message
        res.status(500).json({ error: error.message });
    }
});

//this will take the userId and return reiews where user id matched
router.get("/userReveiw/:id", async (req, res) => {
    let user;
    let book_reviews;
    let user_reviews = [];
    try {
        user = await User.findOne({
            where: { id: parseInt(req.params.id, 10) }
        });
        book_reviews = await Review.findAll({
            where: { user_id: parseInt(req.params.id, 10) }
        });

        if (book_reviews.length === 0) {
            res.status(404).json({ error: "no review found" });
        }

        user_reviews = await Promise.all(book_reviews.map(async (review) => {
            const book = await Book.findOne({
                where: {
                    id: parseInt(review.book_id, 10)
                }
            });
            if (book) {
                const updatedReview = { ...review.dataValues };
                updatedReview.book = { ...book.dataValues };
                updatedReview.user_id = user;
                return updatedReview;
            }
        }));

        res.status(200).json(user_reviews);

    } catch (error) {
        // Handle errors and respond with an error message
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
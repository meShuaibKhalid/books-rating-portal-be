const Review = require('../models/ReviewModel');
const router = require('express').Router();

router.post("/addreview", async (req, res) => {
    try {
        const { title, book_id, user_id, rating } = req.body;
        const review = await Review.create({
            title,
            book_id,
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
router.get("userReiw/:id", async (req, res) => {
    try {
        const book_review = await Review.findAll({
            where: { user_id: parseInt(req.params.id, 10) }
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

module.exports = router;
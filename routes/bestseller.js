const Book = require('../models/BookModel');
const router = require('express').Router();

router.get("/getBestSeller", async (req, res) => {
    try {
        // Fetch all users from the database
        const books = await Book.findAll({
            where: { isLocationBestSeller: true }
        });

        // Respond with the list of users
        res.status(200).json(books);
    } catch (error) {
        // Handle errors and respond with an error message
        res.status(500).json({ error: error.message });
    }
});

router.get("/getBestSeller/:city", async (req, res) => {
    const city = req.params.city.trim().toLowerCase();
    try {
        const books = await Book.findAll({
            where: { location: city }
        });

        // Check if the book exists
        if (books) {
            // Respond with the book if found
            res.status(200).json(books);
        } else {
            // Respond with a 404 status if the book is not found
            res.status(404).json({ error: "data not found" });
        }
    } catch (error) {
        // Handle errors and respond with an error message
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
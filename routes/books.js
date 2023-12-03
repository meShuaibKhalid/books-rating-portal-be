const Book = require('../models/BookModel');
const router = require('express').Router();
// const adminavatar = require('../configurations/avatar');

//create book
router.post("/addBook",
    // adminAvatar.single('file'),
    async (req, res) => {
        try {
            const { abstract, author, title, publish_date, category, rating, location, isLocationBestSeller, image, addedBy } = req.body;
            const book = await Book.create({
                image,
                abstract,
                author,
                title,
                publish_date,
                category,
                rating,
                location,
                isLocationBestSeller,
                addedBy
            });
            res.status(201).json(book);
        } catch (error) {
            // Handle errors and respond with an error message
            res.status(500).json({ error: error.message });
        }
    });
//get all books
router.get("/getBooks", async (req, res) => {
    try {
        // Fetch all users from the database
        const books = await Book.findAll();

        // Respond with the list of users
        res.status(200).json(books);
    } catch (error) {
        // Handle errors and respond with an error message
        res.status(500).json({ error: error.message });
    }
});

//get book by Id
router.get("/:id", async (req, res) => {
    try {
      // Fetch a book by ID from the database
      const book = await Book.findByPk(parseInt(req.params.id, 10));
  
      // Check if the book exists
      if (book) {
        // Respond with the book if found
        res.status(200).json(user);
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
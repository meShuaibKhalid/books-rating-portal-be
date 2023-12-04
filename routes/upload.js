const express = require("express");
const router = express.Router();
const fileSaver = require("fs");
const multer = require("multer");
const bucket = require("../firebase/initialize-firebase");
const User = require("../models/userModel");
const Book = require("../models/BookModel");

/**
 *  Multer middleware to handle file uploads
 *  For temporary storage on the server
 */
const upload = multer({ dest: "uploads/" });

/**
 * Get Unique File Attributes
 * @param {*} file
 * @returns Unique file attributes
 */
function getUniqueFileAttr(file) {
  if (!file) return;
  const filePath = `uploads/${file.path.split("\\")[1]}`; // Our local file path ** backend/uploads/ **

  // Creates a unique file name to handle files with the same name
  let destination = `uploads/${Date.now()}_${file.originalname}`; // Firebase destination path ** uploads/ **
  
  // Check if mimetype is present else add mimetype to the destination path
  const fileTypes = ['jpeg', 'jpg', 'png'];
  destination = destination.includes(fileTypes) ? destination : `${destination}.${file.mimetype.split('/')[1]}`;

  return { filePath, destination };
}

router.post("/avatar/:id", upload.single("file"), async (req, res, next) => {
  const userId = req.params.id;
  const filePath = getUniqueFileAttr(req.file).filePath;

  try {
    switch (req.file.mimetype) {
      case "image/jpeg":
      case "image/png":
      case "image/jpg":
        if (req.file.size > 20e5) {
          return res.status(400).send({
            message: "Image size is too large. Max 2mb",
          });
        }
        break;
      default:
        return res.status(400).send({
          message:
            "Invalid file type. Only jpg, jpeg and png files are allowed",
        });
        break;
    }
    const destination = getUniqueFileAttr(req.file).destination;
    await bucket.upload(filePath, {
      destination: destination,
    });
    // Get download URL
    const fileRef = bucket.file(destination);
    const signedUrls = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-09-2030", // Setting it far into the future so the token doesn't get expired
    });
    
    // Delete the file from our local server ** backend/uploads/ **
    fileSaver.unlinkSync(filePath);
    
    const user = await User.findByPk(parseInt(userId, 10));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user with the provided data
    Object.assign(user, {
      image: signedUrls[0]
    });
    
    console.log('signedUrls[0]: ', signedUrls[0]);
    // Save the updated user
    await user.save();

  } catch (err) {
    console.error("Error uploading file:", err);
    fileSaver.unlinkSync(filePath);
  }
});

router.post("/book/:id", upload.single("file"), async (req, res, next) => {
  const bookID = req.params.id;
  console.log('bookID: ', bookID);
  const filePath = getUniqueFileAttr(req.file).filePath;
  try {
    switch (req.file.mimetype) {
      case "image/jpeg":
      case "image/png":
      case "image/jpg":
        if (req.file.size > 20e5) {
          return res.status(400).send({
            message: "Image size is too large. Max 2mb",
          });
        }
        break;
      default:
        return res.status(400).send({
          message:
            "Invalid file type. Only jpg, jpeg and png files are allowed",
        });
        break;
    }
    const destination = getUniqueFileAttr(req.file).destination;
    await bucket.upload(filePath, {
      destination: destination,
    });
    // Get download URL
    const fileRef = bucket.file(destination);
    const signedUrls = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-09-2030", // Setting it far into the future so the token doesn't get expired
    });
    
    // Delete the file from our local server ** backend/uploads/ **
    fileSaver.unlinkSync(filePath);
    
    const book = await Book.findByPk(parseInt(bookID, 10));

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Update the user with the provided data
    Object.assign(book, {
      image: signedUrls[0]
    });
    
    console.log('signedUrls[0]: ', signedUrls[0]);
    // Save the updated user
    await book.save();

  } catch (err) {
    console.error("Error uploading file:", err);
    fileSaver.unlinkSync(filePath);
  }
});

module.exports = router;

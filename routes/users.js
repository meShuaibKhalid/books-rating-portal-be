const User = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require('bcryptjs');

// Create a new user
router.post("/", async (req, res) => {
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the number of salt rounds

    // Create a new user with the hashed password
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      password: hashedPassword,
    });

    // Respond with the created user and skip password for security reasons
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      image: user.image
    };

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    // Check if the user exists
    if (user) {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      // If the passwords match, generate a JWT token for authentication
      if (passwordMatch) {
        // Respond with the user and skip password for security reasons
        const userWithoutPassword = {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address,
          role: user.role,
          image: user.image
        };
        // Respond with the generated token
        res.status(200).json(userWithoutPassword);
      } else {
        // Respond with a 401 status if the passwords do not match
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      // Respond with a 404 status if the user is not found
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.findAll();

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    // Fetch a user by ID from the database
    const user = await User.findByPk(parseInt(req.params.id, 10));

    // Check if the user exists
    if (user) {
      // Respond with the created user and skip password for security reasons
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      image: user.image
    };
      // Respond with the user if found
      res.status(200).json(userWithoutPassword);
    } else {
      // Respond with a 404 status if the user is not found
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(parseInt(id, 10));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user with the provided data
    Object.assign(user, req.body);

    // Save the updated user
    await user.save();

    // Respond with the created user and skip password for security reasons
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      image: user.image
    };

    // Respond with the updated user
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    // Handle errors and respond with a generic error message
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    // Fetch the user by ID
    const user = await User.findByPk(parseInt(req.params.id, 10));

    // Check if the user exists
    if (user) {
      // Delete the user from the database
      await user.destroy();

      // Respond with a 204 status indicating successful deletion
      res.status(204).end();
    } else {
      // Respond with a 404 status if the user is not found
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

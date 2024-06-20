// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const hashPassword = require("../utils/hash");
const comparePasswords = require("../utils/comparePasswords");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//User login method
router.post("/login", async (req, res) => {
  const { password, email } = req.body;
  console.log(password, email);
  try {
    const user = await User.findByEmail(email);
    if (user === null) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//User register method
router.post("/", async (req, res) => {
  const { username, password, email, confirmPassword } = req.body;
  try {
    // Validate password confirmation
    if (confirmPassword !== password) {
      throw new Error("Passwords don't match");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create and save the new user
    const user = new User({
      username,
      password: hashedPassword,
      email,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, password, email } = req.body;
    if (username != null) user.username = username;
    if (password != null) user.password = password;
    if (email != null) user.email = email;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

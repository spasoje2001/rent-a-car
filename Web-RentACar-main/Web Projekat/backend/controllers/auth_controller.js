const express = require("express");
const router = express.Router();
const userService = require("../service/user_service");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = userService.getAll().find(user => user.username === username);

    if (existingUser) {
      return res.status(400).json({ error: "User with this username already exists." });
    }

    userService.create(req.body);

    return res.status(200).json({ message: "User has been created successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Failure encountered while creating the user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Username:", username);

    const existingUser = await userService.getByUsername(username);

    if (!existingUser || password !== existingUser.password) {
      return res.status(401).json({ error: "Wrong credentials" });
    }
    if(existingUser.isBlocked){
      return res.status(401).json({error: "You are blocked from our website"});
    }
    const { id, userRole } = existingUser;
    const token = jwt.sign({ id, username, userRole }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      userRole,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

module.exports = router;
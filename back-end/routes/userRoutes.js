const express = require("express");
const router = express.Router();
const { addUser } = require("../controllers/userController");

// Định nghĩa route
router.post("/addUser", addUser);

module.exports = router;

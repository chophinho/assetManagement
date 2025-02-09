const express = require("express");
const router = express.Router();
const { addAsset } = require("../controllers/assetController");

// Định nghĩa route
router.post("/assets", addAsset);

module.exports = router;

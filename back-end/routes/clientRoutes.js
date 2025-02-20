const express = require("express");
const router = express.Router();
const { addClient, getAllClient } = require("../controllers/clientController");

router.post("/addClient", addClient);
router.get("/getAllClient", getAllClient);

module.exports = router;

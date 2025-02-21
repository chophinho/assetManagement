const express = require("express");
const router = express.Router();

const {
  addAssetToStorage,
  deleteAssetFromStorage,
  getAllAssetOnStorage,
} = require("../controllers/storageController");

router.post("/add", addAssetToStorage);
router.delete("/delete/:id", deleteAssetFromStorage);
router.get("/get/", getAllAssetOnStorage);

module.exports = router;

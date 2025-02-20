const express = require("express");
const router = express.Router();
const {
  addAsset,
  getAllAsset,
  getAssetByStatus,
  getAssetByOwner,
  deleteAsset,
  getAssetByType,
  updateStatus,
} = require("../controllers/assetController");

router.post("/addAsset", addAsset);
router.delete("/deleteAsset/:id", deleteAsset);
router.get("/getAllAsset", getAllAsset);
router.get("/getAsset/status/:status", getAssetByStatus);
router.get("/getAsset/owner/:owner", getAssetByOwner);
router.get("/getAsset/type/:type", getAssetByType);
router.patch("/updateMaintenance", updateStatus);

module.exports = router;

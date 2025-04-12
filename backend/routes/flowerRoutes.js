const express = require("express");
const upload = require("../config/multerConfig"); 
const { addFlower, getAllFlowers, deleteFlower } = require("../controllers/flowerController");
const router = express.Router();
//  Get all flowers
router.get("/", getAllFlowers);
//  Add a new flower
router.post("/", upload.single("image"), addFlower);
// Delete a flower by ID
router.delete("/:id", deleteFlower);
module.exports = router;

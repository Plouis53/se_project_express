const express = require("express");
const router = express.Router();

const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingittems");

// GET /items - Get all clothing items
router.get("/items", getItems);

// POST /items - Create a new clothing item
router.post("/items", createItem);

// DELETE /items/:itemId - Delete clothing item by ID
router.delete("/items/:itemId", deleteItem);

// Handle non-existent resource
router.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

module.exports = router;

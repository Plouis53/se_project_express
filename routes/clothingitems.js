const express = require("express");
const router = express.Router();

const { getAllItems, createItem, deleteItemById } =
  require("../controllers/clothingittems").default;

// GET /items - Get all clothing items
router.get("/items", getAllItems);

// POST /items - Create a new clothing item
router.post("/items", createItem);

// DELETE /items/:itemId - Delete clothing item by ID
router.delete("/items/:itemId", deleteItemById);

module.exports = router;

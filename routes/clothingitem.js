const router = require("express").Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,

  disLikeItem,
} = require("../controllers/clothingItem");

// CREATE - Create a new clothing item
router.post("/", createItem);

// READ - Get all clothing items
router.get("/", getItems);

// UPDATE - Like an item
router.put("/:itemId/likes", likeItem);

// DELETE - Delete a clothing item by ID
router.delete("/:itemId", deleteItem);

// DELETE - Unlike an item
router.delete("/:itemId/likes", disLikeItem);

module.exports = router;

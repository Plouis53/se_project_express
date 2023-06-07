const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  updateItem,
  disLikeItem,
} = require("../controllers/clothingItem");

// CREATE - Create a new clothing item
router.post("/", auth, createItem);

// READ - Get all clothing items
router.get("/", getItems);

// UPDATE - Like an item
router.put("/:itemId/likes", auth, likeItem);

// UPDATE - Update an item
router.put("/:itemId", auth, updateItem);

// DELETE - Delete a clothing item by ID
router.delete("/:itemId", auth, deleteItem);

// DELETE - Unlike an item
router.delete("/:itemId/likes", auth, disLikeItem);

module.exports = router;

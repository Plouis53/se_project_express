const router = require("express").Router();
const { authorization } = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  updateItem,
  disLikeItem,
} = require("../controllers/clothingItem");

// CREATE - Create a new clothing item
router.post("/", authorization, createItem);

// READ - Get all clothing items
router.get("/", getItems);

// UPDATE - Like an item
router.put("/:itemId/likes", authorization, likeItem);

// UPDATE - Update an item
router.put("/:itemId", authorization, updateItem);

// DELETE - Delete a clothing item by ID
router.delete("/:itemId", authorization, deleteItem);

// DELETE - Unlike an item
router.delete("/:itemId/likes", authorization, disLikeItem);

module.exports = router;

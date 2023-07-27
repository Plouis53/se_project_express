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

const {
  validateCreatedItem,
  validateID,
} = require("../middlewares/validation");

//CREATE - Create a new clothing item
router.post("/", authorization, validateCreatedItem, createItem);

// READ - Get all clothing items
router.get("/", getItems);

// UPDATE - Like an item
router.put("/:itemId/likes", authorization, validateID, likeItem);

// UPDATE - Update an item
router.put("/:itemId", authorization, validateID, updateItem);

// DELETE - Delete a clothing item by ID
router.delete("/:itemId", authorization, validateID, deleteItem);

// DELETE - Unlike an item
router.delete("/:itemId/likes", authorization, validateID, disLikeItem);

module.exports = router;

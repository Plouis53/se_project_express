const router = require("express").Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  updateItem,
  disLikeItem,
} = require("../controllers/clothingItem");

// CREATE - Create a new clothing item
router.post("/", createItem);

// READ - Get all clothing items
router.get("/", getItems);

// UPDATE - Like an item
router.put("/:itemId/likes", likeItem);

// UPDATE - Update an item
router.put("/:itemId", updateItem);

// DELETE - Delete a clothing item by ID
router.delete("/:itemId", deleteItem);

// DELETE - Unlike an item
router.delete("/:itemId/likes", disLikeItem);

module.exports = router;

// // // Handle non-existent resource
// // router.use((req, res) => {
// //   res.status(404).json({ message: "Requested resource not found" });
// // });

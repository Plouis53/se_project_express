const router = require("express").Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  updateItem,
  disLikeItem,
} = require("../controllers/clothingItem");

// CRUD//CREATE //- Create a new clothing item
router.post("/items", createItem);
// READ //- Get all clothing items
router.get("/items", getItems);
// UPDATE // - Like an item
router.put("/items/:itemId/likes", likeItem);
router.put("/:itemId", updateItem);
// DELETE //- Delete clothing item by ID & dislike an item
router.delete("/items/:itemId", deleteItem);
router.delete("/items/:itemId/likes", disLikeItem);

// // Handle non-existent resource
// router.use((req, res) => {
//   res.status(404).json({ message: "Requested resource not found" });
// });

module.exports = router;

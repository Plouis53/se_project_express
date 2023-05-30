const router = require("express").Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItem");

//CRUD
//CREATE // POST /items - Create a new clothing item
router.post("/items", createItem);
// READ // GET /items - Get all clothing items
router.get("/items", getItems);
// UPDATE // PUT /items/:itemId/likes - Like an item
router.put("/items/:itemId/likes", likeItem);
// DELETE // DELETE /items/:itemId - Delete clothing item by ID
router.delete("/items/:itemId", deleteItem);
// DELETE /items/:itemId/likes - Unlike an item
router.delete("/items/:itemId/likes", disLikeItem);
// Handle non-existent resource
router.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

module.exports = router;

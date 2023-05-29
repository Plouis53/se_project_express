const ClothingItem = require("../models/clothingitem");
const User = require("../models/user");

// Get all clothing items
const getItems = (req, res) => {
  try {
    const items = ClothingItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve clothing items" });
  }
};

// Create a new clothing item
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const ownerId = req.user._id; // Assuming user authentication is implemented

  try {
    const owner = User.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    const newItem = new ClothingItem({
      name,
      weather,
      imageUrl,
      owner: ownerId,
    });
    const savedItem = newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create clothing item" });
  }
};

// Delete clothing item by ID
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  try {
    const deletedItem = ClothingItem.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(deletedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete clothing item" });
  }
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};

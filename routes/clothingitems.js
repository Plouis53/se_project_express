const router = require("express").Router();

const { createItem } = require("../controllers/clothingittems");
// CRUD

//CREATE
router.post("/", createItem);

module.exports=router

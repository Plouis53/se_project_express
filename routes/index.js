const router = require("express").Router();
const res = require("express/lib/response");
const clothingItem = require("../models/clothingitem");

router.use(" /items", itemRouter);

router.use((req, res) =>{
  res.status(500).send({message: "Routrer not found"})
})

module.exports=router
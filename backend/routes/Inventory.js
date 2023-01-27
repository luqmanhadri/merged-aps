const express = require("express");
const router = express.Router();
const { Inventory } = require("../models");
<<<<<<< HEAD
const {createItems, getItems, updateItemAvailability, searchItems, updateItem, deleteItem} = require("../controllers/Inventory");

//create items
router.post("/", createItems)

//get items
router.get("/",getItems);

router.patch("/:id", updateItem);

router.delete("/:id", deleteItem);

router.put("/availability/:id", updateItemAvailability);

router.get("/search", searchItems);
=======


>>>>>>> 7aabed20ef40086954cfaddb68f8baa85268a5bd

module.exports = router;
const express = require("express");
const router = express.Router();
const { Inventory } = require("../models");
const {createItems, getItems, updateItemAvailability, searchItems} = require("../controllers/Inventory");

// router.get("/", async (req, res) =>{
//     const listofItems = await Inventory.findAll();
//     res.json(listofItems);
// });


// router.post("/", async (req, res) => {
//     const item = req.body
//     await Inventory.create(item);
//     res.json(item);
// });

//create items
router.post("/", createItems)

//get items
router.get("/",getItems);

router.put("/availability/:id", updateItemAvailability);

router.get("/search", searchItems);

module.exports = router;
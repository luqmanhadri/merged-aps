const express = require("express");
const router = express.Router();
const { Profile } = require("../models");

router.get("/", async (req, res) =>{
    const listofProfiles = await Profile.findAll();
    res.json(listofProfiles);
});

router.get("/byId/:id", async (req,res) =>{
    const id = req.params.id;
    const spesific_profile = await Profile.findByPk(id);
    res.json(spesific_profile);
})

router.post("/", async (req, res) => {
    const post = req.body
    await Profile.create(post);
    res.json(post);
});

module.exports = router;
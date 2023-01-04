const { application } = require("express");
const express = require("express");
const router = express.Router();
const Event = require("../models/event");

router.get("/", async (req, res, next) => {
  const eventlist = await Event.find({});
  res.json(eventlist);
});

// post event to db

router.post("/", async (req, res, next) => {
  const event = new Event(req.body);
  const savedEvent = await event.save();
  res.json(savedEvent);
});

module.exports = router;

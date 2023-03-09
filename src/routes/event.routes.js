const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  joinEvent,
  leaveEvent,
  getEventParticipants,
  getEventCreator,
} = require("../controllers/event.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createEvent", authMiddleware, createEvent);
router.get("/", authMiddleware, getEvents);
router.get("/participants/:eventId", authMiddleware, getEventParticipants);
router.get("/creator/:eventId", authMiddleware, getEventCreator);
router.put("/join/:eventId", authMiddleware, joinEvent);
router.put("/leave/:eventId", authMiddleware, leaveEvent);

module.exports = router;

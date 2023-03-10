const eventService = require("../services/event.service");
const eventValidator = require("../validators/event.validator");

exports.createEvent = async (req, res) => {
  try {
    const userID = req.user._id.toString();
    await eventValidator.creaateeventValidator(req.body);
    const event = await eventService.createEvent(userID, req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await eventService.getEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventParticipants = async (req, res) => {
  try {
    const participants = await eventService.getEventParticipants(
      req.params.eventId
    );
    if (!participants) {
      return res.status(404).json({ message: "Participants not found" });
    }
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventCreator = async (req, res) => {
  try {
    const creator = await eventService.getEventCreator(req.params.eventId);
    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }
    res.status(200).json(creator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    await eventValidator.joinleaveEventValidator(req.body);
    const event = await eventService.joinEvent(
      req.params.eventId,
      req.body.userId
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.leaveEvent = async (req, res) => {
  try {
    await eventValidator.joinleaveEventValidator(req.body);
    const event = await eventService.leaveEvent(
      req.params.eventId,
      req.body.userId
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

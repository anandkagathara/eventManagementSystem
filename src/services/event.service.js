const Event = require("../models/event.model");

exports.createEvent = async (userID, eventData) => {
  const event = new Event(eventData);
  event.creator = userID;
  return await event.save();
};

exports.getEvents = async () => {
  return await Event.find().populate("creator", "-password");
};

exports.getEventParticipants = async (eventId) => {
  const event = await Event.findById(eventId).populate(
    "participants",
    "-password"
  );
  if (event) {
    return event.participants;
  } else {
    return null;
  }
};

exports.getEventCreator = async (eventId) => {
  const event = await Event.findById(eventId).populate("creator", "-password");
  if (event) {
    return event.creator;
  } else {
    return null;
  }
};

exports.joinEvent = async (eventId, userId) => {
  const event = await Event.findById(eventId);
  if (event) {
    if (event.participants.length >= event.maxParticipants) {
      throw new Error("This event is full so you can not join.");
    }
    event.participants.push(userId);
    return await event.save();
  } else {
    return null;
  }
};

exports.leaveEvent = async (eventId, userId) => {
  const event = await Event.findById(eventId);

  if (event) {
    await event.participants.pull(userId);
    return await event.save();
  } else {
    return null;
  }
};

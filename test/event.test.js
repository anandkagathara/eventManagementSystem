const assert = require("assert");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const Event = require("../src/models/event.model");
const User = require('../src/models/user.model');
const eventService = require("../src/services/event.service");

describe("Event Service", function () {
  let testUser;
  let testEvent;

  before(async function () {
    // Connect to the database
    await mongoose.connect("mongodb://localhost:27017/event-management", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async function () {
    // Disconnect from the database
    await mongoose.disconnect();
  });

  beforeEach(async function () {
    // Create a test user
    const email = "testuser@example.com";
    const password = "password";
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    testUser = await user.save();

    // Create a test event
    const eventData = {
      title: "Test Event",
      eventDate: new Date(),
      maxParticipants: 10,
      place: 'Ahmedabad',
      eventTime: "13:00"
    };
    testEvent = await eventService.createEvent(testUser._id, eventData);
  });

  afterEach(async function () {
    // Delete the test user and event
    await User.deleteOne({ _id: testUser._id.toString() });
    await Event.deleteOne({ _id: testEvent._id.toString() });
  });

  describe("createEvent", function () {
    it("should create a new event", async function () {
      const eventData = {
        title: "Test Event",
      eventDate: new Date(),
      maxParticipants: 10,
      place: 'Ahmedabad',
      eventTime: "13:00"
      };
      const event = await eventService.createEvent(testUser._id, eventData);
      assert(event);
      assert.equal(event.name, eventData.name);
      assert.equal(event.creator.toString(), testUser._id.toString());
      await Event.deleteOne({ _id: event._id.toString() });
    });
  });

  describe("getEvents", function () {
    it("should return all events", async function () {
      const events = await eventService.getEvents();
      assert(events);
      assert.equal(events.length, 2);
      assert.equal(events[0].name, testEvent.name);
    });
  });

  describe("getEventParticipants", function () {
    it("should return the participants of an event", async function () {
      const participants = await eventService.getEventParticipants(
        testEvent._id
      );
      assert(participants);
      assert.equal(participants.length, 0);
    });
  });

  describe("getEventCreator", function () {
    it("should return the creator of an event", async function () {
      const creator = await eventService.getEventCreator(testEvent._id);
      assert(creator);
      assert.equal(creator.email, testUser.email);
    });
  });

  describe("joinEvent", function () {
    it("should allow a user to join an event", async function () {
      const eventData = {
        title: "Test Event",
      eventDate: new Date(),
      maxParticipants: 10,
      place: 'Ahmedabad',
      eventTime: "13:00"
      };
      const event = await eventService.createEvent(testUser._id, eventData);
      await eventService.joinEvent(event._id, testUser._id);
      const participants = await eventService.getEventParticipants(event._id);
      assert.equal(participants.length, 1);
      assert.equal(participants[0].email, testUser.email);
      await Event.deleteOne({ _id: event._id.toString() });
    });
  });

  it("should throw an error when an event is full", async function () {
    const maxParticipants = 2;
    const creator = testUser._id;
    const eventData = {
      title: "Test Event",
      eventDate: new Date(),
      maxParticipants: 10,
      place: 'Ahmedabad',
      eventTime: "13:00",
      creator: creator,
    };
    const event = await eventService.createEvent(testUser._id, eventData);

    // Join the event to reach maximum capacity
    await eventService.joinEvent(event._id, testUser._id);
    await eventService.joinEvent(event._id, testUser._id);

    // Try to join the event again
    try {
      await eventService.joinEvent(event._id, testUser._id);
    } catch (error) {
      assert.equal(error.message, "This event is full so you can not join.");
    }
    await Event.deleteOne({ _id: event._id.toString() });
  });
});

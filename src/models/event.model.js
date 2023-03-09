const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  place: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "User", default: null }],
  maxParticipants: { type: Number, default: 10 },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;

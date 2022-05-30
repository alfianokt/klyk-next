const { Schema, Types } = require("mongoose");

const EventSchema = new Schema({
  event_id: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'users',
    required: true,
  },
  event_name: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = EventSchema;
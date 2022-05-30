const { Schema, Types } = require("mongoose");

const ParicipantSchema = new Schema({
  eventId: {
    type: Types.ObjectId,
    ref: 'events',
    required: true,
  },
  participant_id: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = ParicipantSchema;
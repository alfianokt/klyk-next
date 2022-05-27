const { Schema } = require("mongoose");

const UserSchema = new Schema({
  user_id: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  total_point: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = UserSchema;
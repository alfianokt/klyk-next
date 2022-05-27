const { Schema } = require("mongoose");

const SettingSchema = new Schema({
  name: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  value: {
    type: String,
  },
}, { timestamps: true });

module.exports = SettingSchema;
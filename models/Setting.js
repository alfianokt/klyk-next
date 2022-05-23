const { model } = require("mongoose");

const Setting = model('Setting', {
  name: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  value: {
    type: String,
  },
}, 'setting');

module.exports = Setting;
